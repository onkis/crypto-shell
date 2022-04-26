const vuePlugin = require("esbuild-plugin-vue3")

require('esbuild').build({
    entryPoints: ['frontend/donation_page/donation_page.js'],
    bundle: true,
    outdir: 'public/dist/donation_page/',
    publicPath: '/dist/',
    plugins: [vuePlugin()],
    inject: ['frontend/esbuild.inject.js'],
    define: {
      "global": "window",
      "process.env.BASE_URL": process.env.BASE_URL,
      "process.env.NODE_ENV": JSON.stringify("development"),
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
