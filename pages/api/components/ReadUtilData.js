import fs from 'fs';
import path from 'path';
export default function ReadData(req, res) {
    const datasampleDir = path.join(process.cwd(), 'integrateddata');
    const filenames = fs.readdirSync(datasampleDir);

  
    const startIdx = req.query.startIdx;  
    const endIdx = req.query.endIdx || 1; 
  
    const datasample = filenames.slice(0, 4).map((filename) => {
      const filePath = path.join(datasampleDir, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return {
        filename,
        content: fileContents,
      };
    });
  

  
    res.json(datasample);
  }
  
