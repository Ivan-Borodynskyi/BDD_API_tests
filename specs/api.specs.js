/*
Tests vs Features
It is common to think that BDD scenario is equal to test. But it's actually not. Not every test should be described as a feature.
Not every test is written to test real business value. For instance, regression tests or negative scenario tests are not bringing any value to business.
Business analysts don't care about scenario reproducing bug #13, or what error message is displayed when user tries to enter wrong password on login screen.
Writing all the tests inside a feature files creates informational overflow.
This text snippet from codecept.js site https://codecept.io/bdd/#tests-vs-features and I agree with that.
*/

const joi = require('joi');


Feature('validate api calls');

const validResponseSchema = joi.object({
    coords: joi.array(),
    patches: joi.number(),
});
const url = 'http://localhost:8080/v1/cleaning-sessions'

Scenario('I make API POST request to validate Response', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [], "instructions": "EEEEE" })
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsKeys(['coords', 'patches']);
    I.seeResponseMatchesJsonSchema(validResponseSchema);
});

Scenario('I make API GET request to ensure it is not supported', ({ I }) => {
    I.sendGetRequest(url)
    I.seeResponseCodeIsClientError();
});

Scenario('I make API PUT request to ensure it is not supported', ({ I }) => {
    I.sendPutRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [], "instructions": "EEEEE" })
    I.seeResponseCodeIsClientError();
});

Scenario('I make API DELETE request to ensure it is not supported', ({ I }) => {
    I.sendDeleteRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [], "instructions": "EEEEE" })
    I.seeResponseCodeIsClientError();
});


Feature('Tesing movement function');

// Positive scenarios

Scenario('Move hover from bootom left corner to bottom right without patches', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [], "instructions": "EEEEE" })
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [0, 4], patches: 0 })
});

Scenario('Move hover from top right corner to bootom left corner without patches', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [4, 4], "patches": [], "instructions": "WSWWSSWS" })
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [0, 0], patches: 0 })
});

Scenario('Move hover around the perimeter of the room', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [], "instructions": "NNNNEEEESSSSWWWW" })
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [0, 0], patches: 0 })
});

// Negative scenarios

Scenario('Move hover outside the room', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [], "instructions": "NNNNNNNN" })
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [4, 0], patches: 0 })
});

Scenario('Set initial coordinates of the hover outside the room', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [6, 7], "patches": [], "instructions": "EEEEE" })
    I.seeResponseCodeIsClientError();
});

Scenario('Set initial coordinates of the hover with negative numbers', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [-5, -3], "patches": [], "instructions": "SSSS" })
    I.seeResponseCodeIsClientError();
});


Feature('Testing cleaning function');

// Positive scenarios

Scenario('Move hover from bootom left corner to bottom right with 1 patch', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [[1, 0]], "instructions": "EEEEE" })
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [4, 0], patches: 1 })
});

Scenario('Move hover from bootom left corner to bottom right and back with 4 patches', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [[1, 0], [2, 0], [3, 0], [4, 0]], "instructions": "EEEEWWWWW" })
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [4, 0], patches: 4 })
});

// Negative scenarios

Scenario('Set initial coordinates of the patches outside the room', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [[7, 0]], "instructions": "EEEEWWWWW" })
    I.seeResponseCodeIsClientError();
});

Scenario('Set coordinates of the patches with negative numbers', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "patches": [[-1, 0], [2, -3]], "instructions": "EEEEWWWWW" })
    I.seeResponseCodeIsClientError();
});

Scenario('Missing patches key - value', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "instructions": "EEEEWWWWW" })
    I.seeResponseCodeIsClientError();
});

Scenario('Set instructions with random string', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "instructions": "STRING" })
    I.seeResponseCodeIsClientError();
});

Scenario('Set instructions with SQL injection', ({ I }) => {
    I.sendPostRequest(url, { "roomSize": [5, 5], "coords": [0, 0], "instructions": "select * from users; DROP TABLE users;" })
    I.seeResponseCodeIsClientError();
});
