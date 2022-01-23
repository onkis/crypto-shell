import { Router } from 'itty-router'
import { res } from './lib/response.js'

const router = Router()

router.get('/', async (request) => {
  // const home = await VIEWS.get('home');

  //TODO: I think this "new Response" syntax
  //is ugly and could easily be wrapped with a simpler
  //more elegant API like express
  //Response.text()?
  //or Response.json

  return res.render('<h1>Hello Nurse</h1>'); //maybe this? ✅
})


// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))


// attach the router "handle" to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)