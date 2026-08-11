Feature: Login Scenarios
  As a user I want to log in to the application

  Scenario: [TC001] Successful login - Login Successful
    Given I navigate to the login page
    When I enter username "standard_user" and password "secret_sauce"
    And I click the login button
    Then the login result should be "Pass" and message "Login Successful"

  Scenario: [TC002] Failed login - Sorry, this user has been locked out.
    Given I navigate to the login page
    When I enter username "locked_out_user" and password "secret_sauce"
    And I click the login button
    Then the login result should be "Fail" and message "Sorry, this user has been locked out."

  Scenario: [TC003] Failed login - Username and password do not match
    Given I navigate to the login page
    When I enter username "standard_user" and password "wrong_password"
    And I click the login button
    Then the login result should be "Fail" and message "Username and password do not match"

  Scenario: [TC004] Failed login - Username is required
    Given I navigate to the login page
    When I enter username "" and password "secret_sauce"
    And I click the login button
    Then the login result should be "Fail" and message "Username is required"

  Scenario: [TC005] Failed login - Password is required
    Given I navigate to the login page
    When I enter username "standard_user" and password ""
    And I click the login button
    Then the login result should be "Fail" and message "Password is required"

  Scenario: [TC006] Failed login - Username is required
    Given I navigate to the login page
    When I enter username "" and password ""
    And I click the login button
    Then the login result should be "Fail" and message "Username is required"
