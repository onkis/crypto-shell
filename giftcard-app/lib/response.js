export const res = {
  json: function(json){
    const content = JSON.stringify(json);
    return new Response(content, {
      headers: { 'content-type': 'application/json' }
    })
  },
  render: function(html){
    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    })
  }
}