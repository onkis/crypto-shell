const crypto = require('crypto');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const secret = 'veryimportantsecret';

/* KV Namespace ID for 'VIEWS' */
const USE_CHECKSUM = false;
const KV_ID_VIEWS = 'd96c3b4cf4164af78f326b707568ff31';
const viewsDir = `${__dirname}/../views/`;
const outputFile = `${__dirname}/../dist/views.json`;
const views = [];

if(fs.existsSync(outputFile)) fs.unlinkSync(outputFile);

const files = fs.readdirSync (viewsDir);
files.forEach(filename => {
  const filePath = `${viewsDir}${filename}`;
  const value = pug.renderFile(filePath, {});
  const sha = crypto.createHmac("sha256", secret);
  const checksum = (USE_CHECKSUM) ? `_${sha.update(value).digest("hex")}` : '';

  /* filename + checksum */
  const key = filename.split(".pug").join(checksum);
  const mb = Buffer.byteLength(value, 'utf8') * 0.000001;

  if(mb > 25) console.log(`${filePath} HAS EXCEEDED 25MB!`);

  views.push({ key, value });
});

fs.writeFileSync(outputFile, JSON.stringify(views));

exec(`wrangler kv:bulk put --namespace-id='${KV_ID_VIEWS}' '${outputFile}'`);

