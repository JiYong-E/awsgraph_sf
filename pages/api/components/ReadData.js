import fs from 'fs';
import path from 'path';
export default function ReadData(req, res) {
    const datasampleDir = path.join(process.cwd(), 'datasample');
    const filenames = fs.readdirSync(datasampleDir);
  
    const startIdx = req.query.startIdx; 
    const endIdx = req.query.endIdx || 1;  
  
    const datasample = filenames.slice(startIdx, endIdx).map((filename) => {
      const filePath = path.join(datasampleDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return {
        filename,
        content: fileContents,
      };
    });
  

  
    res.json(datasample);
  }
  
