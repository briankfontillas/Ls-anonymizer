const Account = function() {
  let userEmail;
  let userPassword;
  let userFirstName;
  let userLastName;

  function setDisplayName() {
    const CHARACTERS = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let displayName = '';
    
    for (let index = 0; index < 16; index += 1) {
      displayName += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    }

    return displayName;
  }

  function _isValidPassword(input) {
    return input === userPassword;
  }

  return {
    init(email, password, firstName, lastName) {
      userEmail = email;
      userPassword = password;
      userFirstName = firstName;
      userLastName = lastName;
      this.displayName = setDisplayName();

      return this;
    },

    reanonymize(password) {
      if (_isValidPassword(password)) {
        this.displayName = setDisplayName();
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    resetPassword(password, newPassword) {
      if (_isValidPassword(password)) {
        userPassword = newPassword;
        return true;
      } else {
        return 'Invalid Password';
      }
    },

    firstName(password) {
      if (_isValidPassword(password)) {
        return userFirstName;
      } else {
        return 'Invalid Password';
      }
    },
    
    lastName(password) {
      if (_isValidPassword(password)) {
        return userLastName;
      } else {
        return 'Invalid Password';
      }
    },

    email(password) {
      if (_isValidPassword(password)) {
        return userEmail;
      } else {
        return 'Invalid Password';
      }
    }
  }
}();

module.exports = Account;