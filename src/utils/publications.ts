import { escapeHtml, latexToHtml, latexToText } from './latex.ts';

export type BibField = {
  /** Field name exactly as written in the .bib file. */
  name: string;
  /** Field value as written, minus the outer delimiters. */
  value: string;
  /** How the value was delimited: braces, quotes, or nothing (a number or a macro). */
  delimiter: '{' | '"' | '';
};

export type BibEntry = {
  id: string;
  type: string;
  citationKey: string;
  /** Field values keyed by lower-cased name; the display fields have their LaTeX resolved. */
  fields: Record<string, string>;
  /** The display fields rendered as HTML, so math and emphasis survive. */
  html: Record<string, string>;
  /** Fields in source order, used to rebuild the entry. */
  bibFields: BibField[];
  /** The entry as shown for copying: real BibTeX only, with the site's own fields dropped. */
  bibtex: string;
};

/**
 * Fields dropped from the entry offered for copying. Most are the site's own invention and no
 * bibliography style renders them; `note` is standard BibTeX, but here it carries award
 * annotations ("Best Paper") that belong on the page rather than in someone's reference list.
 */
const FIELDS_HIDDEN_FROM_CITATION = new Set([
  'thumbnail',
  'image',
  'poster',
  '_venue',
  'website',
  'video',
  'code',
  'selected',
  'note',
]);

/**
 * Parse a .bib file. Braces are matched by scanning rather than with a regex so that nested
 * braces survive (`title = {A {SLAM} Survey}`) and so that a field missing its separating
 * comma does not swallow the rest of the entry.
 */
function parseEntries(src: string) {
  const entries: { type: string; key: string; fields: BibField[] }[] = [];
  let i = 0;

  function readDelimited(close: string): string {
    let depth = 1;
    let value = '';
    while (i < src.length) {
      const ch = src[i];
      if (ch === '\\' && i + 1 < src.length) {
        value += ch + src[i + 1];
        i += 2;
        continue;
      }
      if (ch === close && --depth === 0) {
        i++;
        break;
      }
      if (close === '}' && ch === '{') depth++;
      value += ch;
      i++;
    }
    return value;
  }

  function readValue(): { value: string; delimiter: BibField['delimiter'] } {
    if (src[i] === '{') {
      i++;
      return { value: readDelimited('}'), delimiter: '{' };
    }
    if (src[i] === '"') {
      i++;
      return { value: readDelimited('"'), delimiter: '"' };
    }
    // A bare value is a number or a macro like `may`; it never spans a line, so stopping at
    // the newline keeps a missing comma from swallowing the next field.
    let value = '';
    while (i < src.length && !',}\n'.includes(src[i])) value += src[i++];
    return { value: value.trim(), delimiter: '' };
  }

  while (i < src.length) {
    const at = src.indexOf('@', i);
    if (at === -1) break;
    i = at + 1;

    let type = '';
    while (i < src.length && /[A-Za-z]/.test(src[i])) type += src[i++];
    while (/\s/.test(src[i])) i++;
    if (!type || src[i] !== '{') continue;
    i++;

    let key = '';
    while (i < src.length && src[i] !== ',' && src[i] !== '}') key += src[i++];

    const fields: BibField[] = [];
    while (i < src.length && src[i] !== '}') {
      // Separators are read liberally: a field missing its comma still starts a new field.
      while (i < src.length && (/\s/.test(src[i]) || src[i] === ',')) i++;
      if (i >= src.length || src[i] === '}') break;

      let name = '';
      while (i < src.length && /[\w:.+/-]/.test(src[i])) name += src[i++];
      while (/\s/.test(src[i])) i++;
      if (src[i] !== '=') {
        if (!name) i++; // not a field assignment; step over it rather than stall
        continue;
      }
      i++;
      while (/\s/.test(src[i])) i++;
      const { value, delimiter } = readValue();
      if (name) fields.push({ name, value, delimiter });
    }
    if (src[i] === '}') i++;

    entries.push({ type, key: key.trim(), fields });
  }

  return entries;
}

/**
 * Turn a BibTeX author list ("Moon, Brady and Scherer, Sebastian") into a readable
 * "Brady Moon, Sebastian Scherer", leaving any LaTeX in the names for the caller to resolve.
 */
function readableAuthors(raw: string): string {
  return raw
    .split(/\s+and\s+|;/i)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const comma = part.indexOf(',');
      if (comma === -1) return part;
      return `${part.slice(comma + 1).trim()} ${part.slice(0, comma).trim()}`.trim();
    })
    .join(', ');
}

export function parseBib(bibRaw: string): BibEntry[] {
  return parseEntries(bibRaw).map(({ type, key, fields: bibFields }) => {
    // Start from the values as written; only the four display fields below get their LaTeX
    // resolved, so URLs and identifiers are never rewritten.
    const fields: Record<string, string> = {};
    for (const field of bibFields) fields[field.name.toLowerCase()] = field.value;

    const venue =
      fields.journal || fields.booktitle || fields.publisher || fields['collection-title'] || fields.series || '';
    const authors = readableAuthors(fields.author || '');
    const { title = '', abstract = '' } = fields;

    fields.title = latexToText(title);
    fields.author = latexToText(authors);
    fields.venue = latexToText(venue);
    fields.abstract = latexToText(abstract);
    fields.image = fields.image || fields.thumbnail || fields.photo || '';
    fields.code = fields.code || fields.repository || fields.repo || '';
    // Only expose `website` when the entry has one — never fall back to `url`.
    fields.website = fields.website || '';

    const entry = {
      id: key,
      type,
      citationKey: key,
      fields,
      html: {
        title: latexToHtml(title) || escapeHtml(key),
        author: latexToHtml(authors),
        venue: latexToHtml(venue),
        abstract: latexToHtml(abstract),
      },
      bibFields,
    };
    return { ...entry, bibtex: formatBibtex(entry) };
  });
}

/**
 * Rebuild the entry from its parsed fields. Rebuilding rather than editing the source text is
 * what guarantees the separating commas, and each value keeps its original delimiter so that
 * `month = may` stays a macro instead of becoming the literal string "may".
 */
function formatBibtex(entry: Pick<BibEntry, 'type' | 'citationKey' | 'bibFields'>): string {
  const lines = entry.bibFields
    .filter((field) => !FIELDS_HIDDEN_FROM_CITATION.has(field.name.toLowerCase()))
    .map(({ name, value, delimiter }) => {
      // Asterisks mark co-first authorship on the page; they are not part of the citation.
      const text = /^(author|editor)$/i.test(name) ? value.trim().replace(/\*/g, '') : value.trim();
      if (delimiter === '"') return `  ${name} = "${text}"`;
      if (delimiter === '') return `  ${name} = ${text}`;
      return `  ${name} = {${text}}`;
    });
  if (!lines.length) return `@${entry.type}{${entry.citationKey}\n}`;
  return `@${entry.type}{${entry.citationKey},\n${lines.join(',\n')}\n}`;
}

export function groupByYear(entries: BibEntry[]) {
  const out: Record<string, BibEntry[]> = {};
  for (const e of entries) {
    const year = (e.fields.year || 'Unknown').toString();
    if (!out[year]) out[year] = [];
    out[year].push(e);
  }
  for (const y of Object.keys(out)) {
    out[y].sort((a, b) => (a.citationKey || '').localeCompare(b.citationKey || ''));
  }
  return out;
}
