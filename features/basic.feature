Feature: basic acceptence tests

  In order to achieve my goals
  As a persona


  Scenario: send post api call
    Given I set POST request
    When I send POST request
    Then I receive valid Response with number 200
    Then I receive payload with valid keys

  Scenario: send get api call
    Given I set GET request
    When I send GET request
    Then I receive valid Response with number 405
