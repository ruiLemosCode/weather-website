const request = require("postman-request");

const WEATHER_STACK_API_KEY = "1a87a7c1b7f2c7220dd842be94ae42e6";
const WEATHER_APP_URL = "http://api.weatherstack.com/current";

const getForecast = (lat, long, cb) => {
  const url = `${WEATHER_APP_URL}?access_key=${WEATHER_STACK_API_KEY}&query=${lat},${long}`;
  request({ url, json: true }, null, (error, { body }) => {
    if (error) {
      cb("Unable to connect to the weather service", undefined);
    } else if (body.error) {
      cb("Unable to find location", undefined);
    } else {
      const {
        current: { temperature, feelslike, weather_descriptions },
      } = body;

      cb(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature}º out. It feels like ${feelslike}º`
      );
    }
  });
};

module.exports = getForecast;
