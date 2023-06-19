const axios = require('axios');

exports.fetchVideoInformation = async (linkId, cbSuccess, cbFailure) => {
  const url = `https://www.googleapis.com/youtube/v3/videos`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    params: {
      id: linkId,
      key: process.env.KEY_API,
      part: 'snippet,statistics'
    }
  };
  let result = null;
  
  await axios.get(url, options)
    .then(response => {
      if (
        response &&
        response.data &&
        response.data.items &&
        Array.isArray(response.data.items) &&
        response.data.items.length > 0
      ) {
        result = response.data.items[0];
      }
      cbSuccess && cbSuccess(result);
    })
    .catch(error => {
      cbFailure && cbFailure(error);
    });
};
