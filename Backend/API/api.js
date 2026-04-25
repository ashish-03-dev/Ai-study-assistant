const axios = require("axios");

async function storeInEndee(id, embedding, text) {
  await axios.post("http://localhost:8000/vectors", {
    id: id,
    values: embedding,
    metadata: {
      text: text,
    },
  });
}