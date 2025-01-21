const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'my-question-form',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

