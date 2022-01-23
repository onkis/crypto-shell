//This is great!
//added "named" functions so stack traces are easier
export const res = {
  json: function json(json){
    const content = JSON.stringify(json);
    return new Response(content, {
      headers: { 'content-type': 'application/json' }
    })
  },
  render: function render(html){
    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    })
  }
}