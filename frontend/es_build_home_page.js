const vuePlugin = require("esbuild-plugin-vue3")

require('esbuild').build({
    entryPoints: ['frontend/home_page/home_page.js'],
    bundle: true,
    outdir: 'public/dist/home_page/',
    publicPath: '/dist/',
    plugins: [vuePlugin()],
    inject: ['frontend/esbuild.inject.js'],
    //external: ['./images/*']
    define: {
      "global": "window",
      "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
      "process.env.NODE_ENV": JSON.stringify(process.env.BASE_URL),
    },
    loader:{
      '.eot': 'file',
      '.woff': 'file',
      '.woff2': 'file',
      '.svg': 'dataurl',
      '.ttf': 'file',
      '.png':'dataurl',
      '.jpg': 'file'
    }
});
