Feature: basic acceptance tests

  In order to achieve my goals
  As a persona


  Scenario: Move hover from left top corner to right top with 2 patches not on the way
    When I move hover with init coords: [0, 4] and path: "EEEE" with 2 patches
    Then I receive hover with coords: [4, 4] and 0 cleaned patches

  Scenario: Move hover from right top corner to left bottom with 2 patches on the way
    When I move hover with init coords: [4, 4] and path: "WSWSWSWS" with 2 patches
    Then I receive hover with coords: [0, 0] and 2 cleaned patches