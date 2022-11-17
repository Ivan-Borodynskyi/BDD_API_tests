/*
Tests vs Features
It is common to think that BDD scenario is equal to test. But it's actually not. Not every test should be described as a feature.
Not every test is written to test real business value. For instance, regression tests or negative scenario tests are not bringing any value to business.
Business analysts don't care about scenario reproducing bug #13, or what error message is displayed when user tries to enter wrong password on login screen.
Writing all the tests inside a feature files creates informational overflow.
This text snippet from codecept.js site https://codecept.io/bdd/#tests-vs-features and I agree with this point.
*/

const joi = require('joi');


Feature('validate api calls');

const validResponseSchema = joi.object({
    coords: joi.array(),
    patches: joi.number(),
});


Scenario('I make API POST request to validate Response', ({ I }) => {
    I.performPostRequest(0,0,'EEEEE')
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsKeys(['coords', 'patches']);
    I.seeResponseMatchesJsonSchema(validResponseSchema);
});

Scenario('I make API GET request to ensure it is not supported', ({ I }) => {
    I.performGetRequest()
    I.seeResponseCodeIsClientError();
});

Scenario('I make API PUT request to ensure it is not supported', ({ I }) => {
    I.performPutRequest()
    I.seeResponseCodeIsClientError();
});

Scenario('I make API DELETE request to ensure it is not supported', ({ I }) => {
    I.performDeleteRequest()
    I.seeResponseCodeIsClientError();
});


Feature('Tesing movement function');

// Positive scenarios

Scenario('Move hover from bootom left corner to bottom right', ({ I }) => {
    I.performPostRequest(0, 0, "EEEEE" )
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [0, 4], patches: 0 })
});

Scenario('Move hover from top right corner to bootom left corner', ({ I }) => {
    I.performPostRequest(4, 4, "WSWWSSWS" )
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [0, 0], patches: 0 })
});

Scenario('Move hover around the perimeter of the room', ({ I }) => {
    I.performPostRequest(0, 0, "NNNNEEEESSSSWWWW" )
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [0, 0], patches: 0 })
});

// Negative scenarios

Scenario('Move hover outside the room', ({ I }) => {
    I.performPostRequest(0, 0, "NNNNNNNN" )
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [4, 0], patches: 0 })
});

Scenario('Set initial coordinates of the hover outside the room', ({ I }) => {
    I.performPostRequest(6, 7, "EEEEE")
    I.seeResponseCodeIsClientError();
});

Scenario('Set initial coordinates of the hover with negative numbers', ({ I }) => {
    I.performPostRequest(-5, -3, "SSSS" )
    I.seeResponseCodeIsClientError();
});


Feature('Testing cleaning function');

// Positive scenarios

Scenario('Move hover from bootom left corner to bottom right with 1 patch', ({ I }) => {
    I.performPostRequest(0, 0, "EEEEE", [[1, 0]])
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [4, 0], patches: 1 })
});

Scenario('Move hover from bootom left corner to bottom right and back with 4 patches', ({ I }) => {
    I.performPostRequest(0, 0, "EEEEWWWWW", [[1, 0], [2, 0], [3, 0], [4, 0]] )
    I.seeResponseCodeIsSuccessful();
    I.seeResponseContainsJson({ coords: [4, 0], patches: 4 })
});

// Negative scenarios

Scenario('Set initial coordinates of the patches outside the room', ({ I }) => {
    I.performPostRequest(0, 0, "EEEEWWWWW", [[7, 0]] )
    I.seeResponseCodeIsClientError();
});

Scenario('Set coordinates of the patches with negative numbers', ({ I }) => {
    I.performPostRequest(0, 0, "EEEEWWWWW", [[-2, -3]] )
    I.seeResponseCodeIsClientError();
});

Scenario('Missing instructions - value', ({ I }) => {
    I.performPostRequest(0, 0)
    I.seeResponseCodeIsClientError();
});

Scenario('Set instructions with random string', ({ I }) => {
    I.performPostRequest(0, 0, "STRING")
    I.seeResponseCodeIsClientError();
});

Scenario('Set instructions with SQL injection', ({ I }) => {
    I.performPostRequest(0, 0, "select * from users; DROP TABLE users;")
    I.seeResponseCodeIsClientError();
});
