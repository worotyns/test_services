// bin/app/api.js
// API entry point. Start/stop this with, for example, PM2.

const { Api } = require('../../build/src/Api');
const api = new Api();
const server = api.express.listen(8000);
api.io.attach(server);

// Manual shutdown:
// server.close()
// api.randomController.nyan.close()