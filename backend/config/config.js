const config = require('nconf').file({ file: 'config.json' });

function getConfigParam(param) {
    return config.get(param);
}

module.exports = getConfigParam;