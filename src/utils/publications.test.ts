// Run with `npm test` (Node's built-in test runner; no extra dependency).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { latexToHtml, latexToText } from './latex.ts';
import { parseBib } from './publications.ts';

test('resolves the LaTeX that appears in titles and names', () => {
  // Braces protecting capitalization, an escaped ampersand and inline math (issue #146).
  assert.equal(latexToText('Robust {SLAM} for {UAV}s'), 'Robust SLAM for UAVs');
  assert.equal(latexToText('CougarTail \\& CUB'), 'CougarTail & CUB');
  assert.equal(latexToText('Weighted Group-$k$ Sets'), 'Weighted Group-k Sets');
  assert.equal(latexToHtml('Weighted Group-$k$ Sets'), 'Weighted Group-<em>k</em> Sets');
  // Escapes, accents, and commands we do not model keep their content.
  assert.equal(latexToText('100\\% of a\\_b \\#1 \\{x\\}'), '100% of a_b #1 {x}');
  assert.equal(
    latexToText('Garc\\\'ia, M\\"uller, Ko\\v{c}, Fran\\c{c}ois, {\\o}stergaard'),
    'García, Müller, Koč, François, østergaard'
  );
  assert.equal(latexToText('\\emph{Fast} \\textbf{SLAM}'), 'Fast SLAM');
  // Input is escaped; the only tags emitted are the ones we generate.
  assert.equal(latexToHtml('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
});

const SOURCE = `
@inproceedings{demo2024key,
  title = {A {SLAM} Survey, Revisited},
  author = {Doe*, Jane and Roe, John},
  booktitle = "Proceedings of {ICRA}",
  month = may,
  year = 2024
  url = {https://example.com/paper.pdf},
  website = {https://example.com},
  video = {https://youtu.be/abc},
  code = {https://github.com/example/repo},
  note = {Best Paper},
  selected = {true},
  thumbnail = {src/assets/images/publications/x.png}
}
`;

test('parses an entry the site can render', () => {
  const [entry] = parseBib(SOURCE);
  assert.equal(entry.citationKey, 'demo2024key');
  assert.equal(entry.fields.title, 'A SLAM Survey, Revisited');
  assert.equal(entry.html.title, 'A SLAM Survey, Revisited');
  assert.equal(entry.fields.author, 'Jane Doe*, John Roe'); // co-first asterisk stays on the page
  assert.equal(entry.fields.venue, 'Proceedings of ICRA');
  assert.equal(entry.fields.year, '2024');
  // Links and image paths are never put through the LaTeX decoder.
  assert.equal(entry.fields.url, 'https://example.com/paper.pdf');
  assert.equal(entry.fields.website, 'https://example.com');
  assert.equal(entry.fields.video, 'https://youtu.be/abc');
  assert.equal(entry.fields.image, 'src/assets/images/publications/x.png');
});

test('rebuilds BibTeX that is valid and free of the site-only fields', () => {
  const [entry] = parseBib(SOURCE);
  assert.equal(
    entry.bibtex,
    [
      '@inproceedings{demo2024key,',
      '  title = {A {SLAM} Survey, Revisited},', // capitalization braces survive
      '  author = {Doe, Jane and Roe, John},', // co-first asterisk dropped from the citation
      '  booktitle = "Proceedings of {ICRA}",', // original delimiter kept
      '  month = may,', // stays a macro, not the literal string {may}
      '  year = 2024,', // the comma the source file was missing
      '  url = {https://example.com/paper.pdf}',
      '}',
    ].join('\n')
  );
});
