import type CiteType from 'citation-js';
let Cite: typeof CiteType | undefined;
try {
  // dynamic import to avoid breaking environments where the package isn't installed yet
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // @ts-ignore
  Cite = require('citation-js');
} catch (e) {
  Cite = undefined;
}

export type BibEntry = {
  id: string;
  type?: string;
  citationKey?: string;
  fields: Record<string, string>;
  bibtex?: string;
  raw?: any;
};

// Try to use citation-js when available for robust parsing; otherwise fallback to simple regex parser.
export function parseBib(bibRaw: string): BibEntry[] {
  if (Cite) {
    try {
      const cite = new (Cite as any)(bibRaw);
      const items = cite.get ? cite.get({ type: 'data' }) : (cite.data || []);
      return (items || []).map((it: any) => {
        const fields: Record<string, string> = {};
        fields.title = it.title || it['title'] || '';
        fields.abstract = it.abstract || it['abstract'] || '';
        fields.url = it.URL || it.url || it.link || '';
        // Prefer an explicit "website" field when present in citation-js data
        // Do NOT fall back to url here — only set `website` when explicitly present.
        fields.website = (it.website || it.websiteTitle) ? (it.website || it.websiteTitle) : '';
        fields.pdf = it.pdf || it.PDF || it.file || '';
        fields.doi = it.DOI || it.doi || it['doi'] || '';
        fields.code = it.code || it['code'] || it.repository || it.repo || '';
        fields.poster = it.poster || '';
        // image/thumbnail fields
        fields.image = it.image || it.thumbnail || it.image_url || it['image'] || '';
        // Determine venue from common Citation.js/CSL fields
        fields.venue = it['container-title'] || it.containerTitle || it.journal || it['journal'] || it.publisher || it.booktitle || it['collection-title'] || '';
        // try some other common image fields
        
        
        
        const year = (it.issued && it.issued['date-parts'] && it.issued['date-parts'][0] && it.issued['date-parts'][0][0]) || it.year || '';
        fields.year = year ? String(year) : '';

        const authorsArr = (it.author || []).map((a: any) => {
          if (typeof a === 'string') return a;
          const given = a.given || a['given'] || '';
          const family = a.family || a['family'] || '';
          if (given && family) return `${given} ${family}`;
          return `${given} ${family}`.trim();
        }).filter(Boolean);
        fields.author = authorsArr.join(', ');

        return {
          id: it.id || it['citationKey'] || Math.random().toString(36).slice(2),
          type: it.type || '',
          citationKey: it.id || it['citationKey'] || '',
          fields,
          bibtex: it['bibtex'] || '',
          raw: it,
        } as BibEntry;
      });
    } catch (err) {
      // fall through to fallback parser
      // eslint-disable-next-line no-console
      console.warn('citation-js parse failed, falling back to regex parser', err);
    }
  }

  // Fallback simple parser (previous implementation)
  const entries: BibEntry[] = [];
  const entryRegex = /@(\w+)\s*\{\s*([^,]+),([\s\S]*?)\n\}/g;
  let m: RegExpExecArray | null;
  while ((m = entryRegex.exec(bibRaw))) {
    const type = m[1];
    const citationKey = m[2].trim();
    const body = m[3];

    const fields: Record<string, string> = {};
    const fieldRegex = /(\w+)\s*=\s*(\{|")([\s\S]*?)(\}|\")\s*,?/g;
    let fm: RegExpExecArray | null;
    while ((fm = fieldRegex.exec(body))) {
      const k = fm[1].toLowerCase();
      const v = fm[3].trim();
      fields[k] = v;
    }

    // populate venue from common fallback fields
    fields.venue = fields.journal || fields.booktitle || fields.publisher || fields['collection-title'] || fields.series || '';
    // fallback for images in raw bibtex
    fields.image = fields.image || fields.thumbnail || fields.photo || '';
    // DOI and code may be present as fields in raw bibtex
    fields.doi = fields.doi || fields.DOI || '';
    fields.code = fields.code || fields.repository || fields.repo || '';
    // Expose a `website` field for bib entries only if present (do NOT fall back to url)
    fields.website = fields.website || '';

    // Normalize author string to "Given Family" comma-separated when possible
    if (fields.author && typeof fields.author === 'string') {
      const parts = fields.author.split(/\s+and\s+|\s*&\s*|;/i).map((p) => p.trim()).filter(Boolean);
      const norm = parts.map((p) => {
        if (p.indexOf(',') !== -1) {
          const [last, first] = p.split(',').map((s) => s.trim());
          return `${first} ${last}`.trim();
        }
        return p;
      });
      fields.author = norm.join(', ');
    }

    entries.push({
      id: citationKey,
      type,
      citationKey,
      fields,
      bibtex: m[0].trim(),
    });
  }
  return entries;
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
