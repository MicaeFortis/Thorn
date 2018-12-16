/**
 * Created by MichalPC on 26.11.2018.
 */
const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy('/api',
        {
            target: 'localhost:8080',
            ws: true
        }
    ));
};