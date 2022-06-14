import S3 from 'aws-sdk/clients/s3';
import formidable from 'formidable;
import {vasyncPipeline} from './core.mjs';
import {v4 as uuid4} from 'uuid';
import Hashids from 'hashids'
const hashids = new Hashids()
const bucket = process.env.S3_BUCKET;
const accessKey = process.env.S3_ACCESS_KEY
const accessKeySecret = process.env.S3_ACCESS_KEY_SECRET;

async function uploadFileToS3(user_id, page_id, req){
  
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
          }
        });
      },
      //2. read file from disk into buffer
      function readFileFromDisk(arg, done){
        fs.readFile(arg.file.path, function(err, data){
          if(err) done(err);
          else{
            arg.base64Data = new Buffer(data, 'binary');
            done();
          }
        });
      },
        //3. put the file in s3
       // Assign it a UUID and url
      function uploadToS3(arg, done){
        const path = "images+/"+hashids.encode(user_id)+"/"+hashids.encode(page_id)+"/"+arg.file.name;
        const s3 = new S3({
          accessKeyId: accessKeyId,
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
        fs.unlink(arg.file.path, done);
      }
    ]
  });
  //6. return the url
  if(err) return [err, null];
  else return [null, fullPath];
}
