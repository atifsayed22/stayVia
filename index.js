var axios = require('axios');

var config = {
  method: 'get',
  url: 'https://api.geoapify.com/v1/geocode/reverse?lat=51.21709661403662&lon=6.7782883744862374&apiKey=63e6af78d6864557a7c0dfe700f63179',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(response.data);
})
.catch(function (error) {
  console.log(error);
});
