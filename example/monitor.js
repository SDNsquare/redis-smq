'use strict';

const config = require('./config');
const { monitor } = require('../'); // replace with require('redis-smq');

monitor(config).listen(() => {
    console.log('It works!');
});
