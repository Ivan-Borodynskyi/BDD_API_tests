const { I } = inject();


Given('I set POST request', () => {
  url = 'http://localhost:8080/v1/cleaning-sessions'
  valid_payload = { "roomSize" : [5, 5], "coords" : [0, 0], "patches" : [ [2, 2], [3, 2] ], "instructions" : "EEEEENWWWWWNEEEEENWWWWWWNEEEEE" }
});

When('I send POST request', () => {
  I.sendPostRequest(url, valid_payload)
});

Then('I receive valid Response with number {int}', (code)=> {
  I.seeResponseCodeIs(code)
});

Then('I receive payload with valid keys', ()=> {
  I.seeResponseContainsKeys(['patches', 'coords']);
});


Given('I set GET request', () => {
  url = 'http://localhost:8080/v1/cleaning-sessions'
});
  
When('I send GET request', () => {
  I.sendGetRequest(url)
});
