const vuePlugin = require("esbuild-plugin-vue3")

require('esbuild').build({
    entryPoints: ['frontend/app/app.js'],
    bundle: true,
    outdir: 'public/dist/app/',
    publicPath: '/dist/',
    plugins: [vuePlugin()],
    define: {
      "global": "window",
      "process.env.BASE_URL": process.env.BASE_URL,
      "process.env.NODE_ENV": JSON.stringify("development")
    },
    loader:{
      '.eot': 'file',
      '.woff': 'file',
      '.woff2': 'file',
      '.svg': 'file',
      '.ttf': 'file',
      '.png':'file',
      '.jpg': 'file'
    }
});
