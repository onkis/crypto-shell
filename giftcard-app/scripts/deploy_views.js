const crypto = require('crypto');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const secret = 'veryimportantsecret';

const viewsDir = `${__dirname}/../views/`;
const outputFile = `${__dirname}/../dist/views.json`;
const output = [];

if(fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

fs.readdir(viewsDir, function(err, files){
  if(err) console.error("failed to get files", err);
  else{
    files.forEach(filename => {
      const filePath = `${viewsDir}${filename}`;
      const value = pug.renderFile(filePath, {});
      const sha = crypto.createHmac("sha256", secret);
      const checksum = sha.update(value).digest("hex");

      console.log(filename, checksum);

      /* filename + checksum */
      const key = filename.split(".pug").join(`_${checksum}`);

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