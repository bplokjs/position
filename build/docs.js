const { build } = require('make-webpack-config');

build({
    cleanDist: true,
    appPath: process.cwd() + '/examples',
    appDist: process.cwd() + '/docs',
    resolve: {
        alias: {
        }
    }
});