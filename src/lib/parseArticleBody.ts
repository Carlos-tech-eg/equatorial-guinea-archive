export type ArticleBlock = { type: 'p' | 'h2'; text: string };

/** Convierte texto largo (párrafos separados por línea en blanco) en bloques de artículo. */
export function parseArticleBody(description: string): { blocks: ArticleBlock[]; source?: string } {
  let text = description.trim();
  if (!text) return { blocks: [] };

  let source: string | undefined;
  const authorMatch = text.match(/\n\nAutor:\s*([\s\S]+)$/);
  if (authorMatch) {
    source = authorMatch[1].trim();
    text = text.slice(0, authorMatch.index).trim();
  }

  const blocks = text
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => ({ type: 'p' as const, text: part }));

  return { blocks, source };
}
