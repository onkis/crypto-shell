import { Router } from 'itty-router'
import { res } from './lib/response.js'
import { Client } from './lib/driver/postgres'

const router = Router()
const env = {}
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
  // const home = await VIEWS.get('home');

  //TODO: I think this "new Response" syntax
  //is ugly and could easily be wrapped with a simpler
  //more elegant API like express
  //Response.text()?
  //or Response.json
  await query();
  return res.render('<h1>Hello Nurse</h1>'); //maybe this? ✅
})


// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))


// attach the router "handle" to the event handler
// addEventListener('fetch', event =>
//   event.respondWith(router.handle(event.request))
// )

const app = {
  async fetch(request){
    return router.handle(request);
  }
};
export default app;