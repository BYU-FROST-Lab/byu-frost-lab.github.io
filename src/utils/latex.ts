// Resolves the LaTeX that appears in BibTeX fields into readable text: escaped characters
// (\&), braces used to protect capitalization ({SLAM}), inline math ($k$) and accents (\'e).
//
// Only the human-readable title/author/venue/abstract go through here. The entry shown in the
// "BibTeX" disclosure is deliberately left as LaTeX so that it still compiles when pasted.

// Accent commands, as the Unicode combining mark they apply. Appending the mark and
// normalizing to NFC yields the precomposed character: 'e' + U+0301 -> 'é'.
const ACCENTS: Record<string, string> = {
  "'": '́', // acute
  '`': '̀', // grave
  '^': '̂', // circumflex
  '"': '̈', // diaeresis
  '~': '̃', // tilde
  '=': '̄', // macron
  '.': '̇', // dot above
  u: '̆', // breve
  v: '̌', // caron
  H: '̋', // double acute
  r: '̊', // ring above
  c: '̧', // cedilla
  k: '̨', // ogonek
};

// Letters that have no combining form and so get their own command.
const LETTERS: Record<string, string> = {
  o: 'ø',
  O: 'Ø',
  l: 'ł',
  L: 'Ł',
  aa: 'å',
  AA: 'Å',
  ae: 'æ',
  AE: 'Æ',
  oe: 'œ',
  OE: 'Œ',
  ss: 'ß',
  i: 'ı',
  j: 'ȷ',
};

export function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function isLetter(ch: string) {
  return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

function decode(source: string, asHtml: boolean): string {
  const src = source;
  let i = 0;
  const emit = (text: string) => (asHtml ? escapeHtml(text) : text);

  // The argument of a command: a braced group, or the single token that follows.
  function argument(): string {
    if (i >= src.length) return '';
    if (src[i] === '{') {
      i++;
      return run('}');
    }
    if (src[i] === '\\') return command();
    return emit(src[i++]);
  }

  function accent(mark: string): string {
    while (src[i] === ' ') i++;
    let base = argument();
    // Dotless i and j exist only so that an accent can be placed on them.
    if (base === 'ı') base = 'i';
    if (base === 'ȷ') base = 'j';
    return (base + mark).normalize('NFC');
  }

  function command(): string {
    i++; // the backslash
    const ch = src[i];
    if (ch === undefined) return '';

    if (!isLetter(ch)) {
      if (ACCENTS[ch]) {
        i++;
        return accent(ACCENTS[ch]);
      }
      i++;
      // "\\" is a line break and "\ " a forced space; anything else is an escaped literal
      // such as \&, \%, \$, \#, \_, \{ or \}.
      return emit(ch === '\\' || /\s/.test(ch) ? ' ' : ch);
    }

    let name = '';
    while (i < src.length && isLetter(src[i])) name += src[i++];
    // A control word swallows the space that ends it, but only when an argument follows —
    // otherwise "\o Nilsson" would lose the space between the words.
    const next = i + (src.slice(i).match(/^[ \t]*/)?.[0].length ?? 0);
    if (src[next] === '{') i = next;

    if (ACCENTS[name] && name.length === 1) return accent(ACCENTS[name]);
    if (LETTERS[name]) return emit(LETTERS[name]);
    // Anything else (\emph, \textbf, \mathcal, ...): drop the command, keep what it wraps.
    return src[i] === '{' ? argument() : '';
  }

  function run(stop: string | null): string {
    let out = '';
    while (i < src.length) {
      const ch = src[i];
      if (ch === stop) {
        i++;
        return out;
      }
      if (ch === '{') {
        // A brace group carries no meaning of its own here; it is normally there to protect
        // capitalization, as in {SLAM}.
        i++;
        out += run('}');
      } else if (ch === '}') {
        i++; // unbalanced
      } else if (ch === '\\') {
        out += command();
      } else if (ch === '$') {
        i++;
        const display = src[i] === '$';
        if (display) i++;
        const math = run('$');
        if (display && src[i] === '$') i++;
        out += asHtml ? `<em>${math}</em>` : math;
      } else if (ch === '~') {
        i++;
        out += emit(' ');
      } else {
        i++;
        out += emit(ch);
      }
    }
    return out;
  }

  // Collapse the line wrapping that long BibTeX values carry; \s would also eat the
  // non-breaking space that ~ produces, so match the plain whitespace explicitly.
  return run(null)
    .replace(/[ \t\r\n]+/g, ' ')
    .trim();
}

/** Render a LaTeX string as plain text, for alt attributes and other non-markup contexts. */
export function latexToText(source?: string): string {
  return source ? decode(source, false) : '';
}

/** Render a LaTeX string as HTML. Input is escaped; the only tags emitted are our own. */
export function latexToHtml(source?: string): string {
  return source ? decode(source, true) : '';
}
