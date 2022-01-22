import { Router } from 'itty-router'

const router = Router()


router.get('/', function(request){
  //TODO: I think this "new Response" syntax
  //is ugly and could easily be wrapped with a simpler
  //more elegant API like express
  //Response.text()?
  //or Response.json
  return new Response("Hello Nurse", {
    headers: { 'content-type': 'text/plain' }
  })
})


// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))


// attach the router "handle" to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)