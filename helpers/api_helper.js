const Helper = require('@codeceptjs/helper');
/**
* This class describes basic API calls(GET, POST, PUT, DELETE)
*/
class Api extends Helper {


  url = 'http://localhost:8080/v1/cleaning-sessions'
  valid_payload = { "roomSize": [5, 5], "coords": [0, 0], "patches": [[1, 0], [3, 0]], "instructions": "EEEEE" }
  invalid_payload = { "roomSize": [5, 5], "coords": [0, 0], "instructions": "TEST" }

  /** 
  * Performs POST request with given endpoint and payload
  * @param {number} init_x - initial x coordinate of hover
  * @param {number} init_y - initial y coordinate of hover
  * @param {string} route - hover route
  * @param {Array} patches - patches coordinates
  */
  async performPostRequest(init_x, init_y, route, patches = [[1, 0], [3, 0]]) {
    return await this.helpers['REST'].sendPostRequest(this.url, { "roomSize": [5, 5], "coords": [init_x, init_y], "patches": patches, "instructions": route });
  };

  /**
   * Performs GET request with given endpoint
   */
  async performGetRequest() {
    return await this.helpers['REST'].sendGetRequest(this.url);
  };

  /**
   * Performs PUT request with given endpoint and payload
   */
  async performPutRequest() {
    return await this.helpers['REST'].sendPutRequest(this.url, this.valid_payload);
  };

  /**
   * Performs DELETE request with given endpoint and payload
   */
  async performDeleteRequest() {
    return await this.helpers['REST'].sendDeleteRequest(this.url, this.valid_payload);
  };
}


module.exports = Api;
