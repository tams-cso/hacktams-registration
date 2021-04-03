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
            outdir: 'build-public',
            define: { 'process.env.NODE_ENV': '"production"' }
        })
        .catch((err) => {
            console.dir(err);
            process.exit(1);
        });

    // Copy over public folder
    await fsExtra
        .copy(
            path.resolve(__dirname, 'src', 'client', 'public'),
            path.resolve(__dirname, 'build-public')
        )
        .catch((err) => {
            console.dir(err);
            process.exit(1);
        });

    // Copy over client to the build folder
    await fsExtra
        .move(
            path.resolve(__dirname, 'build-public'),
            path.resolve(__dirname, 'build', 'client', 'public')
        )
        .catch((err) => {
            console.dir(err);
            process.exit(1);
        });
})();
