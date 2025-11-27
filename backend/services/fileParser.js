const fs = require('fs');
const csv = require('csv-parser');
const XLSX = require('xlsx');
const path = require('path');

async function parseFile(filePath, originalName = '') {
  const ext = originalName 
    ? path.extname(originalName).toLowerCase() 
    : path.extname(filePath).toLowerCase();
  const questions = [];

  console.log('Parsing file:', { filePath, originalName, ext });

  try {
    if (ext === '.csv' || filePath.toLowerCase().endsWith('.csv') || originalName.toLowerCase().endsWith('.csv')) {
      let isFirstRow = true;
      let parseError = null;
      
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath, { encoding: 'utf8' })
          .pipe(csv({
            skipEmptyLines: true,
            skipLinesWithError: true,
            headers: false
          }))
          .on('data', (row) => {
            let question;
            if (Array.isArray(row)) {
              question = row[0]?.toString().trim();
            } else {
              const firstKey = Object.keys(row)[0];
              question = row[firstKey]?.toString().trim();
            }
            
            if (isFirstRow) {
              isFirstRow = false;
              if (question) {
                const lowerQuestion = question.toLowerCase();
                if (lowerQuestion === 'questions' || lowerQuestion === 'question' || lowerQuestion.includes('header')) {
                  return;
                }
              }
            }
            
            if (question && question.length > 0) {
              questions.push(question);
            }
          })
          .on('end', () => {
            if (questions.length === 0) {
              try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
                lines.forEach((line, index) => {
                  if (index === 0) {
                    const lowerLine = line.toLowerCase();
                    if (lowerLine === 'questions' || lowerLine === 'question' || lowerLine.includes('header')) {
                      return;
                    }
                  }
                  const firstColumn = line.split(',')[0].trim().replace(/^"|"$/g, '');
                  if (firstColumn && firstColumn.length > 0) {
                    questions.push(firstColumn);
                  }
                });
              } catch (fallbackError) {
                console.error('Fallback CSV parsing error:', fallbackError);
              }
            }
            resolve();
          })
          .on('error', (err) => {
            console.error('CSV parsing error:', err);
            parseError = err;
            try {
              const fileContent = fs.readFileSync(filePath, 'utf8');
              const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
              lines.forEach((line, index) => {
                if (index === 0) {
                  const lowerLine = line.toLowerCase();
                  if (lowerLine === 'questions' || lowerLine === 'question' || lowerLine.includes('header')) {
                    return;
                  }
                }
                const firstColumn = line.split(',')[0].trim().replace(/^"|"$/g, '');
                if (firstColumn && firstColumn.length > 0) {
                  questions.push(firstColumn);
                }
              });
              resolve();
            } catch (fallbackError) {
              reject(err);
            }
          });
      });
      
      if (parseError && questions.length === 0) {
        throw parseError;
      }
    } else if (ext === '.xlsx' || ext === '.xls') {
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      if (data.length > 0) {
        const firstKey = Object.keys(data[0])[0];
        data.forEach((row, index) => {
          const question = row[firstKey]?.toString().trim();
          if (index === 0) {
            const lowerQuestion = question.toLowerCase();
            if (lowerQuestion === 'questions' || lowerQuestion === 'question' || lowerQuestion.includes('header')) {
              return;
            }
          }
          if (question && question.length > 0) {
            questions.push(question);
          }
        });
      }
    } else {
      if (originalName.toLowerCase().endsWith('.csv')) {
        console.log('Extension not detected from path, but originalName is CSV. Attempting CSV parsing...');
        try {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
          lines.forEach((line, index) => {
            if (index === 0) {
              const lowerLine = line.toLowerCase();
              if (lowerLine === 'questions' || lowerLine === 'question' || lowerLine.includes('header')) {
                return;
              }
            }
            const firstColumn = line.split(',')[0].trim().replace(/^"|"$/g, '');
            if (firstColumn && firstColumn.length > 0) {
              questions.push(firstColumn);
            }
          });
          if (questions.length > 0) {
            console.log('Successfully parsed as CSV (fallback)');
          } else {
            throw new Error(`No questions found in CSV file.`);
          }
        } catch (fallbackError) {
          throw new Error(`Failed to parse CSV file: ${fallbackError.message}`);
        }
      } else {
        throw new Error(`Unsupported file format. Expected .csv, .xlsx, or .xls, but got: ${ext || 'no extension'} (original: ${originalName})`);
      }
    }

    fs.unlinkSync(filePath);

    return questions;
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw error;
  }
}

module.exports = { parseFile };

