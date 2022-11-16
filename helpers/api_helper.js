const Helper = require('@codeceptjs/helper');

class Api extends Helper {

  /*
  This class describes basic API calls(GET, POST, PUT, DELETE)
  */

  url = 'http://localhost:8080/v1/cleaning-sessions'
  valid_payload = { "roomSize": [5, 5], "coords": [0, 0], "patches": [[1, 0], [3, 0]], "instructions": "EEEEE" }
  invalid_payload = { "roomSize": [5, 5], "coords": [0, 0], "instructions": "TEST" }


  async performPostRequest(init_x, init_y, path) {
    /*
    Performs POST request
    with given endpoint and payload
    */
    return await this.helpers['REST'].sendPostRequest(this.url, { "roomSize": [5, 5], "coords": [init_x, init_y], "patches": [[1, 0], [3, 0]], "instructions": path });
  };

  async performGetRequest() {
    /*
    Performs GET request
    with given endpoint
    */

    return await this.helpers['REST'].sendGetRequest(this.url);
  };

  async performPutRequest() {
    /*
    Performs PUT request
    with given endpoint and payload
    */

    return await this.helpers['REST'].sendPutRequest(this.url);
  };

  async performDeleteRequest() {
    /*
    Performs DELETE request
    with given endpoint and payload
    */
    return await this.helpers['REST'].sendDeleteRequest(this.url, this.valid_payload);
  };
}


module.exports = Api;
