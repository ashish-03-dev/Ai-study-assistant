export const split = (text) => {
  const chunkSize = 500;
  const chunks = [];

  for (let i = 0; i < text.length; i += chunkSize) {
    const chunk = text.slice(i, i + chunkSize).trim();

    if (chunk.length > 0) {
      chunks.push(chunk);
    }
  }

  return chunks;
};