const request = require("postman-request");

const POSITION_STACK_API_KEY = "86fab690ce3301bed35ddaa69c926718";
const POSITION_STACK_URL = `http://api.positionstack.com/v1/forward`;

const getCoordinates = (address, cb) => {
  const url = `${POSITION_STACK_URL}?access_key=${POSITION_STACK_API_KEY}&query=${address}=&limit=1`;
  request({ url: url, json: true }, null, (error, { body }) => {
    if (error) {
      cb("Unable to connect to the geocoding service", undefined);
    } else if (body.error) {
      cb("Unable to find coordinates for location", undefined);
    } else {
      const data = body.data;
      if (data.length === 0) {
        cb("Unable to find coordinates for location provided", undefined);
      } else {
        cb(undefined, data[0]);
      }
    }
  });
};

module.exports = getCoordinates;
