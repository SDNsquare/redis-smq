'use strict';

const redis = require('redis');
const IORedis = require('ioredis');

const clients = [];

module.exports = {
  /**
   *
   * @param {object} config
   * @param {function} cb
   * @return {object}
   */
  getNewInstance(config = {}, cb) {
    const { redis: redisParams = {} } = config;
    let driver = 'redis';
    let driverOptions = {};
    if (redisParams.driver) {
      driver = redisParams.driver;
      if (redisParams.options) driverOptions = redisParams.options;
    } else driverOptions = redisParams;
    const client = driver === 'ioredis' ? new IORedis(driverOptions) : redis.createClient(driverOptions);
    client.on('ready', () => {
      clients.push(client);
      if (redisParams.options.password) {
        client.on('connect', () => {
          client.auth(config.password, err => {
            if (!err) cb(client);
            else throw err;
          });
        });
      } else {
        cb(client);
      }
    });
  },

  getAllClients() {
    return clients;
  }
};
