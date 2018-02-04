// bin/app/random.js
// Service entry point. Start/stop this with, for example, PM2.

const { RandomService } = require('../../build/src/Random/RandomService');
const randomService = new RandomService();

// Manual shutdown:
// randomService.nyan.close()