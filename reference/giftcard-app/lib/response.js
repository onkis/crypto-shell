//This is great!
//added "named" functions so stack traces are easier
export const res = {
  setViews: function(VIEWS){
    this.VIEWS = VIEWS;
  },
  json: async function(json){
    const content = JSON.stringify(json);
    return new Response(content, {
      headers: { 'content-type': 'application/json' }
    })
  },
  render: async function(view){
    const html = await this.VIEWS.get(view);
    return new Response(html, {
      headers: { 'content-type': 'text/html' }
    })
  }
}