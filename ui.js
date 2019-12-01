const rl = require('readline');

class UI {

  constructor() {
    this.readline = rl.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  prompt(question) {
    const self = this;
    return new Promise(function(resolve, reject) {
      self.readline.question(`\u001b[1;36m${question}\u001b[0m `, (command) => {
        self.readline.close();
        resolve(command);
      });
    })
  };
}

module.exports = { UI };
