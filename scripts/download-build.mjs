import 'dotenv/config';
import { Octokit } from "octokit";
import { simpleGit, CleanOptions } from 'simple-git';
import {asyncWrap} from "../lib/core.mjs";
import { writeFile } from 'node:fs';

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH
})



async function main(){
  let [err, commit] = await gitProcess();
  if(err) console.error("git log err", err);
  else if(/*commit && commit.refs.match("HEAD -> prod")*/ true){
    let sha = "d3a3bc152ede5770632cc94dcced582d3d6ef4d4";//commit.hash;
    
    let [err, artifact] = await getArtifact(sha);
    if(err) return console.error("problem getting artifact");
    else{
      console.log("downloading...")
      let [err, ret] = await downloadArtifact(artifact);
      writeFile(process.cwd()+"/build/crypto-shell.zip", arrayBufferToBufferCycle(ret.data), function(err){
        if(err) console.error("trouble writing file", err);
        else{
          console.log("finished")
        }
      });
    }
    //8. upload .env, binary to server
    //9. unzip, change permissions, reload, run migrations?
  }
  else{
    console.error("you're on the wrong branch");
  }
}

await main();


function arrayBufferToBufferCycle(ab) {
  var buffer = Buffer.alloc(ab.byteLength);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
      buffer[i] = view[i];
  }
  return buffer;
}


async function gitProcess(){
  const git = simpleGit({
    baseDir: process.cwd()
  });
  let err, ret;
  
  // [err, ret] = await asyncWrap(git.fetch("origin"));
  // 
  // console.log("fnished fetch", err, ret);
  // 
  // [err, ret] = await asyncWrap(git.checkout("prod"));
  // 
  // console.log("checkout prod", err, ret);
  // 
  // [err, ret] = await asyncWrap(git.rebase("origin/master"));
  // 
  // console.log("rebased local prod to origin/master", err, ret);
  
  [err, ret] = await asyncWrap(git.log("-n 1"));
  if(err) return [err, null];
  
  console.log("git log", ret.all[0]);
  return [null, ret.all[0]];
}

async function downloadArtifact(artifact){
   return await asyncWrap(octokit.request('GET /repos/onkis/crypto-shell/actions/artifacts/'+artifact.id+'/zip', {
      owner: 'onkis',
      repo: 'crypto-shell',
      artifact_id: artifact.id,
      archive_format: 'zip'
    }));
}




async function getArtifact(sha){
  let ret, err;
  try{
    ret = await octokit.request('GET /repos/onkis/crypto-shell/actions/artifacts', {
      owner: 'onkis',
      repo: 'crypto-shell'
    });  
  } catch(e){
    err = e;
  }
  if(err) return [err, null];
  else{
    if(ret && ret?.data?.total_count > 0){
      let artifact;
      for(let i = 0; i < ret.data.total_count; i+=1){
        artifact = ret.data.artifacts[i];
        if(artifact && artifact.workflow_run.head_sha === sha) break;
        else artifact = null;
      }
      return [null, artifact];
      //console.log("got", );
    }
  }
  
}