const url = require('url');
function buildResponse(status, message, data) {
  return { status, message, data };
}

function buildURL(base, params) {
    const newURL = url.parse(base, true);
    newURL.query = params;
    return url.format(newURL);
}

module.exports.buildResponse = buildResponse;
module.exports.buildURL = buildURL;