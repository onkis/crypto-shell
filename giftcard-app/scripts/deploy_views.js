const crypto = require('crypto');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const secret = 'veryimportantsecret';

/* KV Namespace ID for 'VIEWS' */
const KV_ID_VIEWS = '5c5f567b7fde4418baf641c8ff0d678e';
const viewsDir = `${__dirname}/../views/`;
const outputFile = `${__dirname}/../dist/views.json`;
const views = [];

if(fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

const files = fs.readdirSync (viewsDir);
files.forEach(filename => {
  const filePath = `${viewsDir}${filename}`;
  const value = pug.renderFile(filePath, {});
  const sha = crypto.createHmac("sha256", secret);
  const checksum = sha.update(value).digest("hex");

  /* filename + checksum */
  const key = filename.split(".pug").join(`_${checksum}`);
  const mb = Buffer.byteLength(value, 'utf8') * 0.000001;

  if(mb > 25) console.log(`${filePath} HAS EXCEEDED 25MB!`);

  views.push({ key, value });
});

fs.writeFileSync(outputFile, JSON.stringify(views));

exec(`wrangler kv:bulk put --namespace-id='${KV_ID_VIEWS}' '${outputFile}'`);

