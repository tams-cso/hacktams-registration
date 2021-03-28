const esbuild = require('esbuild');
const fsExtra = require('fs-extra');
const path = require('path');

(async function () {
    // Build React app
    await esbuild
        .build({
            entryPoints: [path.resolve(__dirname, 'src', 'client', 'src', 'index.tsx')],
            bundle: true,
            minify: true,
            outdir: 'build',
        })
        .catch((err) => console.dir(err));

    // Copy over public folder
    await fsExtra
        .copy(
            path.resolve(__dirname, 'src', 'client', 'public'),
            path.resolve(__dirname, 'build')
        )
        .catch((err) => console.dir(err));
    // TODO: build the express app
})();
