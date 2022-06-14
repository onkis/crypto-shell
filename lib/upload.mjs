import S3 from 'aws-sdk/clients/s3';
import formidable from 'formidable;
import {asyncWrap} from './core.mjs';



async function uploadFileToS3(user_id, page_id, req){
  
  //1. Parse the form with formidable
  //2. read file from disk into buffer
  //3. put the file in s3
  // Assign it a UUID and url
  //4. make a record of the uploaded item
  //5. clean up the temp file from disk
  //6. return the url
}
