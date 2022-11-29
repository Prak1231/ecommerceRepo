'use strict';

const bcrypt = require('bcrypt');

const loggerUtil = require('./logger');

exports.comparePasswords = async (plainTextPassword, hash) => {
  try {
    return await bcrypt.compare(plainTextPassword, hash);
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error'
    });
    return false;
  }
};

exports.generateHash = async (plainTextPassword) => {
  try {
    return await bcrypt.hash(plainTextPassword, 16);
  } catch (ex) {
    loggerUtil.error({
      message: ex.toString(),
      level: 'error'
    });
    return false;
  }
};
