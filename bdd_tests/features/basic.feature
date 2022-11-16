Feature: basic acceptence tests

  In order to achieve my goals
  As a persona


  Scenario: Move hover from left botton corner to right bottom with 2 patches on the way
    When I move hover with init coords: [0, 0] and path: "EEEE" with 2 patches on the way
    Then I receive hover with coords: [4, 0] and 2 cleaned patches

  Scenario: Move hover from right top corner to left bottom with 2 patches not on the way
    When I move hover with init coords: [4, 4] and path: "WSWSWSWS" with 2 patches on the way
    Then I receive hover with coords: [0, 0] and 0 cleaned patches