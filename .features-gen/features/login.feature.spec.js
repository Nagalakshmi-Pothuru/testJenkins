// Generated from: features\login.feature
import { test } from "playwright-bdd";

test.describe('Login Scenarios', () => {

  test('[TC001] Successful login - Login Successful', async ({ Given, When, Then, And, page }) => { 
    await Given('I navigate to the login page', null, { page }); 
    await When('I enter username "standard_user" and password "secret_sauce"', null, { page }); 
    await And('I click the login button', null, { page }); 
    await Then('the login result should be "Pass" and message "Login Successful"', null, { page }); 
  });

  test('[TC002] Failed login - Sorry, this user has been locked out.', async ({ Given, When, Then, And, page }) => { 
    await Given('I navigate to the login page', null, { page }); 
    await When('I enter username "locked_out_user" and password "secret_sauce"', null, { page }); 
    await And('I click the login button', null, { page }); 
    await Then('the login result should be "Fail" and message "Sorry, this user has been locked out."', null, { page }); 
  });

  test('[TC003] Failed login - Username and password do not match', async ({ Given, When, Then, And, page }) => { 
    await Given('I navigate to the login page', null, { page }); 
    await When('I enter username "standard_user" and password "wrong_password"', null, { page }); 
    await And('I click the login button', null, { page }); 
    await Then('the login result should be "Fail" and message "Username and password do not match"', null, { page }); 
  });

  test('[TC004] Failed login - Username is required', async ({ Given, When, Then, And, page }) => { 
    await Given('I navigate to the login page', null, { page }); 
    await When('I enter username "" and password "secret_sauce"', null, { page }); 
    await And('I click the login button', null, { page }); 
    await Then('the login result should be "Fail" and message "Username is required"', null, { page }); 
  });

  test('[TC005] Failed login - Password is required', async ({ Given, When, Then, And, page }) => { 
    await Given('I navigate to the login page', null, { page }); 
    await When('I enter username "standard_user" and password ""', null, { page }); 
    await And('I click the login button', null, { page }); 
    await Then('the login result should be "Fail" and message "Password is required"', null, { page }); 
  });

  test('[TC006] Failed login - Username is required', async ({ Given, When, Then, And, page }) => { 
    await Given('I navigate to the login page', null, { page }); 
    await When('I enter username "" and password ""', null, { page }); 
    await And('I click the login button', null, { page }); 
    await Then('the login result should be "Fail" and message "Username is required"', null, { page }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\login.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":4,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":5,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":6,"keywordType":"Action","textWithKeyword":"When I enter username \"standard_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":17,"value":"\"standard_user\"","children":[{"start":18,"value":"standard_user","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"secret_sauce\"","children":[{"start":47,"value":"secret_sauce","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":7,"keywordType":"Action","textWithKeyword":"And I click the login button","stepMatchArguments":[]},{"pwStepLine":10,"gherkinStepLine":8,"keywordType":"Outcome","textWithKeyword":"Then the login result should be \"Pass\" and message \"Login Successful\"","stepMatchArguments":[{"group":{"start":27,"value":"\"Pass\"","children":[{"start":28,"value":"Pass","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"Login Successful\"","children":[{"start":47,"value":"Login Successful","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":13,"pickleLine":10,"tags":[],"steps":[{"pwStepLine":14,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When I enter username \"locked_out_user\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":17,"value":"\"locked_out_user\"","children":[{"start":18,"value":"locked_out_user","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":48,"value":"\"secret_sauce\"","children":[{"start":49,"value":"secret_sauce","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":16,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"And I click the login button","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"Then the login result should be \"Fail\" and message \"Sorry, this user has been locked out.\"","stepMatchArguments":[{"group":{"start":27,"value":"\"Fail\"","children":[{"start":28,"value":"Fail","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"Sorry, this user has been locked out.\"","children":[{"start":47,"value":"Sorry, this user has been locked out.","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":20,"pickleLine":16,"tags":[],"steps":[{"pwStepLine":21,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When I enter username \"standard_user\" and password \"wrong_password\"","stepMatchArguments":[{"group":{"start":17,"value":"\"standard_user\"","children":[{"start":18,"value":"standard_user","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"wrong_password\"","children":[{"start":47,"value":"wrong_password","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":23,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"And I click the login button","stepMatchArguments":[]},{"pwStepLine":24,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"Then the login result should be \"Fail\" and message \"Username and password do not match\"","stepMatchArguments":[{"group":{"start":27,"value":"\"Fail\"","children":[{"start":28,"value":"Fail","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"Username and password do not match\"","children":[{"start":47,"value":"Username and password do not match","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":27,"pickleLine":22,"tags":[],"steps":[{"pwStepLine":28,"gherkinStepLine":23,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"When I enter username \"\" and password \"secret_sauce\"","stepMatchArguments":[{"group":{"start":17,"value":"\"\"","children":[{"start":18,"value":"","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":33,"value":"\"secret_sauce\"","children":[{"start":34,"value":"secret_sauce","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":30,"gherkinStepLine":25,"keywordType":"Action","textWithKeyword":"And I click the login button","stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":26,"keywordType":"Outcome","textWithKeyword":"Then the login result should be \"Fail\" and message \"Username is required\"","stepMatchArguments":[{"group":{"start":27,"value":"\"Fail\"","children":[{"start":28,"value":"Fail","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"Username is required\"","children":[{"start":47,"value":"Username is required","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":34,"pickleLine":28,"tags":[],"steps":[{"pwStepLine":35,"gherkinStepLine":29,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":30,"keywordType":"Action","textWithKeyword":"When I enter username \"standard_user\" and password \"\"","stepMatchArguments":[{"group":{"start":17,"value":"\"standard_user\"","children":[{"start":18,"value":"standard_user","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"\"","children":[{"start":47,"value":"","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":37,"gherkinStepLine":31,"keywordType":"Action","textWithKeyword":"And I click the login button","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":32,"keywordType":"Outcome","textWithKeyword":"Then the login result should be \"Fail\" and message \"Password is required\"","stepMatchArguments":[{"group":{"start":27,"value":"\"Fail\"","children":[{"start":28,"value":"Fail","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"Password is required\"","children":[{"start":47,"value":"Password is required","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":41,"pickleLine":34,"tags":[],"steps":[{"pwStepLine":42,"gherkinStepLine":35,"keywordType":"Context","textWithKeyword":"Given I navigate to the login page","stepMatchArguments":[]},{"pwStepLine":43,"gherkinStepLine":36,"keywordType":"Action","textWithKeyword":"When I enter username \"\" and password \"\"","stepMatchArguments":[{"group":{"start":17,"value":"\"\"","children":[{"start":18,"value":"","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":33,"value":"\"\"","children":[{"start":34,"value":"","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":44,"gherkinStepLine":37,"keywordType":"Action","textWithKeyword":"And I click the login button","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":38,"keywordType":"Outcome","textWithKeyword":"Then the login result should be \"Fail\" and message \"Username is required\"","stepMatchArguments":[{"group":{"start":27,"value":"\"Fail\"","children":[{"start":28,"value":"Fail","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"},{"group":{"start":46,"value":"\"Username is required\"","children":[{"start":47,"value":"Username is required","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end