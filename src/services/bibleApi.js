export async function getChapter(book, chapter) {
  const formattedBook = book.toLowerCase().replace(/\s+/g, "+");
  const res = await fetch(
    `https://bible-api.com/${chapter.book}+${chapter.chapterNumber}?translation=almeida`
  );

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erro ao buscar capítulo");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
