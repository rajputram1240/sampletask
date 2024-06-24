const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());


app.post('/submit-number', (req, res) => {
    const inputNumber = req.body.number;
    const allFiles = ['fileA.txt', 'fileB.txt', 'fileC.txt', 'fileD.txt'];

    if (typeof inputNumber !== 'number' || inputNumber < 1 || inputNumber > 25) {
      return res.status(400).send('Invalid input. Please enter a number between 1 and 25.');
    }
  
    const result = inputNumber * 7;
    let fileName;
  
    if (result > 140) {
      fileName = 'fileA.txt';
    } else if (result > 100) {
      fileName = 'fileB.txt';
    } else if (result > 60) {
      fileName = 'fileC.txt';
    } else {
      fileName = 'fileD.txt';
    }
   
    const allNumbers = [];
   const allFilesHaveNumbers = allFiles.every(file => {
     if (fs.existsSync(file)) {
       const content = fs.readFileSync(file, 'utf-8');
        allNumbers.push(`${content} Number stored in ${file}`);
        return !isNaN(content) && content.trim() !== '';
      }
      return false;
     });

    if (allFilesHaveNumbers) {
       return res.send(`Process complete. No further input allowed.\n${allNumbers[0]}\n${allNumbers[1]}\n${allNumbers[2]}\n${allNumbers[3]}`);
    }
  
    fs.writeFileSync(fileName, result.toString());
  
    res.send(`${result.toString()} Number stored in ${fileName}`);
  });
  
  app.get('/clear-files', (req, res) => {
    
    const files = ['fileA.txt', 'fileB.txt', 'fileC.txt', 'fileD.txt'];
    files.forEach(file => {
       fs.writeFileSync(file, ''); 
    });

    res.send('All files have been cleared.');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
