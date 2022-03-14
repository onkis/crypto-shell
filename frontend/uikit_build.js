const vuePlugin = require("esbuild-plugin-vue3")
const sassPlugin = require('esbuild-sass-plugin').sassPlugin;

require('esbuild').build({
    entryPoints: ['uikit/main.js'],
    bundle: true,
    //outfile: 'dist/out.js',
    outdir: '../public/dist/',
    plugins: [vuePlugin(), sassPlugin({
      
    })],
    define: {
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
