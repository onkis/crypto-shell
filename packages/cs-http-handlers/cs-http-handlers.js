//This is great!
//added "named" functions so stack traces are easier
export const res = {
  json: async function(json){
    const content = JSON.stringify(json);
    return new Response(content, {
      headers: { 'content-type': 'application/json' }
    })
  },
  render: async function(view){
    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    })
  }
}