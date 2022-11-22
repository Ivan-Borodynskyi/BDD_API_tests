const { I } = inject();


When('I move hover with init coords: [{int}, {int}] and path: {string} with 2 patches', (init_x, init_y, path) => {
  I.performPostRequest(init_x, init_y, path)
});

Then('I receive hover with coords: [{int}, {int}] and {int} cleaned patches', (end_x, end_y, patches) => {
  I.seeResponseContainsKeys(['patches', 'coords']);
  I.seeResponseContainsJson({ "coords": [end_x, end_y], "patches": patches })
});
