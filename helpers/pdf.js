import pdf from 'pdf-parse';
import fs from 'fs';

const extractPdfData = async (pdfPath) => {
  const dataBuffer = fs.readFileSync(pdfPath);
  const data = await pdf(dataBuffer);
  return data.text; // Return extracted text
};

export  { extractPdfData };
