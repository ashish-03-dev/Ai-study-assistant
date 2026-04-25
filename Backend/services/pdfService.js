import fs from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");  // ✅ now real function

export const extractText = async (filePath) => {
  const buffer = fs.readFileSync(filePath);

  const data = await pdfParse(buffer);

  return data.text;
};
