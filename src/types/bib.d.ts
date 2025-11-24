declare module '*.bib?raw' {
  const content: string;
  export default content;
}

declare module '*.bib' {
  const content: string;
  export default content;
}
