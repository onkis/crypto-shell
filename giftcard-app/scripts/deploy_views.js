const fs = require('fs');
const path = require('path');
const pug = require('pug');
const { exec } = require('child_process');

const viewsDir = `${__dirname}/../views/`;
const outputFile = `${__dirname}/../dist/views.json`;
const output = [];

if(fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

fs.readdir(viewsDir, function(err, files){
  if(err) console.error("failed to get files", err);
  else{
    files.forEach(file => {
      const key = file.split(".pug").join("");
      const filePath = `${viewsDir}${file}`;
      const value = pug.renderFile(filePath, {});
      const mb = Buffer.byteLength(value, 'utf8') * 0.000001;

      if(mb > 25) console.log(`${filePath} HAS EXCEEDED 25MB!`);

      output.push({ key, value });
    });

    fs.writeFile(outputFile, JSON.stringify(output), (err) => {
      if (err) console.log("failed to write!", err);
      console.log(outputFile);
    });
  }
})