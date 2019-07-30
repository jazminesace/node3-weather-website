const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/e58cc138f0d68277d3823f7e8bf8d104/${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!");
    } else if (body.error) {
      callback("Unable to find location");
    } else {
      current_temp = body.currently.temperature;
      rain_prob = body.currently.precipProbability;
      summary = body.daily.data[0].summary;
      callback(
        undefined,
        `${summary} It is currently ${current_temp} degrees out. There is a ${rain_prob}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
