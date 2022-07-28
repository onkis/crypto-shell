import 'dotenv/config';
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH
})



async function main(){
//1. Checkout prod branch
//2. rebase it upto origin/master
//3. push it up
//4. get the sha
//5. wait for github action to run
//6. get the artifact
//7. download the artifact
//8. upload .env, binary to server
//9. unzip, change permissions, reload, run migrations?
  
}

await main();


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