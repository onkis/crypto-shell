import { Router } from 'itty-router'
import { res } from 'cs-http-handlers'
import { Client } from './lib/driver/postgres'

const router = Router()
async function query(){
  const client = new Client({
    user: 'postgres',
    database: 'giftcard_app_dev',
    // hostname is the full URL to your pre-created Cloudflare Tunnel, see documentation here:
    // https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/create-tunnel
    hostname: env.TUNNEL_HOST || 'https://postgres-dev.oilbirt.com',
    password: env.DATABASE_PASSWORD || 'password', // use a secret to store passwords
    port: 5432,
  })
  
  await client.connect()
  
  let query = await client.queryObject(`select * from "Whatever"`);
  
  console.log("query result", query.rows[0]);
  console.log(Object.keys(query))
  return query; 
}

router.get('/', async (request) => {  
  // await query(); I'm having trouble with the DB + Tunneling
  return res.render('home') // maybe this? ✅
})
// 404 for everything else
router.all('*', () => {
  new Response('Not Found.', { status: 404 })
})

const app = {
  async fetch(request, env) {
    if(!isKvSet){
      res.setViews(env.VIEWS);
      isKvSet = true;
    }
    return router.handle(request, env);
  }
};

export default app;