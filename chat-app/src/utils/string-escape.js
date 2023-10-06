export function extractWords(input) {
  const wordsOnly = input.match(/[a-zA-Z0-9]+/g);
  if (wordsOnly) {
    return wordsOnly.join(' ');  // Menggabungkan kata-kata menjadi satu string
  } else {
    return '';  // Return string kosong jika tidak ada kata yang cocok
  }
}