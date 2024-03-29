import S3 from 'aws-sdk/clients/s3.js'; //todo this is probably the wrong way to do this import
import formidable from 'formidable';
import {vasyncPipeline} from './core.mjs';
import {v4 as uuid4} from 'uuid';
import Hashids from 'hashids'
const hashids = new Hashids()
import fs from 'fs';
const bucket = process.env.S3_BUCKET;
const accessKey = process.env.S3_ACCESS_KEY
const accessKeySecret = process.env.S3_ACCESS_KEY_SECRET;
/**
 * Uploads a file to S3
 * @param {Number} user_id - the users's id
 * @param {Number} page_id - the payment pages's id
 * @param {Object} req - the express.js request object
 * @returns {Tuple}  - [err, PathToFileInS3<String>]
 */
export async function uploadFileToS3(user_id, page_id, req){
  
  let fullPath;
  
  let [err, results] = await vasyncPipeline({
    arg: {},
    funcs:[
      //1. Parse the form with formidable
      function parseForm(arg, done){
        let form = new formidable.IncomingForm({filename: uuid4()});
        form.parse(req, function(err, fields, files){
          if(err) done(err);
          else{
            arg.file = files.file; 
            done();
          }
        });
      },
      //2. read file from disk into buffer
      function readFileFromDisk(arg, done){
        fs.readFile(arg.file.filepath, function(err, data){
          if(err) done(err);
          else{
            arg.base64Data = Buffer.from(data, 'binary');
            done();
          }
        });
      },
        //3. put the file in s3
       // Assign it a UUID and url
      function uploadToS3(arg, done){
        const path = "images/"+hashids.encode(user_id)+"/"+hashids.encode(page_id)+"/"+arg.file.newFilename;
        console.log("upload to s3", path);
        const s3 = new S3({
          accessKeyId: accessKey,
          secretAccessKey: accessKeySecret
        });
        fullPath = "https://s3.amazonaws.com/"+bucket+"/"+path;
        s3.putObject({
          Bucket: bucket,
          Key: path,
          Body: arg.base64Data,
          ACL: 'public-read'
        }, function(err){
          if(err) done(err)
          else done(null, fullPath);
        });
      },
      //4. make a record of the uploaded item?
      //5. clean up the temp file from disk
      function rmTmpFile(arg, done){
        fs.unlink(arg.file.filepath, done);
      }
    ]
  });
  //6. return the url
  if(err) return [err, null];
  else return [null, fullPath];
}
