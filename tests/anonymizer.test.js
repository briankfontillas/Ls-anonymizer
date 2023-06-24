let Account = require('../anonymizer');

describe("foobar instance from Account", () => {
  let fooBar;

  beforeEach(() => {
    fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
  });

  test("calling fooBar.firstname returns method", () => {
    expect(typeof fooBar.firstName).toEqual('function');
  });

  test("firstName method to get private data first name", () => {
    expect(fooBar.firstName('123456')).toEqual('foo');
  });

  test("calling fooBar.lastName returns method", () => {
    expect(typeof fooBar.lastName).toEqual('function');
  });

  test("lastName method to get private data last name", () => {
    expect(fooBar.lastName('123456')).toEqual('bar');
  });

  test("calling fooBar.email returns method", () => {
    expect(typeof fooBar.email).toEqual('function');
  });

  test("email method to get private data email", () => {
    expect(fooBar.email('123456')).toEqual('foo@bar.com');
  });

  test("fooBar has public displayName data", () => {
    expect(typeof fooBar.displayName).toEqual('string');
  });

  test("User cannot get password private data", () => {
    expect(fooBar.password).toBe(undefined);
    expect(fooBar.userPassword).toBe(undefined);
    expect(() => {fooBar.password('123456')}).toThrow();
  });

  test("Reset password successfully", () => {
    expect(fooBar.resetPassword('123', 'abc')).toEqual('Invalid Password');
    expect(fooBar.resetPassword('123456', 'abc')).toBe(true);
    expect(fooBar.firstName('123456')).toEqual('Invalid Password');
    expect(fooBar.firstName('abc')).toBe('foo');
  });

  test('reanonymize method changes displayname', () => {
    let initialName = fooBar.displayName;

    expect(fooBar.reanonymize('123456')).toBe(true);
    expect(fooBar.displayName).not.toEqual(initialName);
  });

  test('fooBar invalid password inputs', () => {
    [
      fooBar.firstName,
      fooBar.lastName,
      fooBar.email,
      fooBar.reanonymize
    ].forEach(func => {
      expect(func('invalid test pw')).toEqual('Invalid Password');
    });

    expect(fooBar.resetPassword('invalid test pw')).toEqual('Invalid Password');
  });
});