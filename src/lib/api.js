// Wrapper to fetch chapter text from a public Bible API (bible-api.com)
// If the API fails, the caller should handle fallback to manual content.
export async function fetchChapter(query){
  // query example: 'Joao 3' or 'John 3'
  try {
    const base = 'https://bible-api.com/';
    const q = encodeURIComponent(query.replace(' ', '+'));
    const url = `${base}${q}?translation=almeida`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('API response not ok');
    const data = await res.json();
    // bible-api returns {text: "..."} or verses; handle common cases
    if(data.text) return data.text;
    if(Array.isArray(data.verses)) return data.verses.map(v => v.text).join('\n');
    // fallback stringify
    return JSON.stringify(data);
  } catch(e){
    throw e;
  }
}
