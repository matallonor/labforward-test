const ipc = require("node-ipc");
const { Constants } = require('./constants');

class Device {

  constructor() {
    this.setup();
    this.connectDevice();
  }

  setup() {
    ipc.config.id = "device";
    ipc.config.silent = true;
    ipc.config.rawBuffer=true;
    ipc.config.encoding='ascii';
  }

  connectDevice() {
    const self = this;
    ipc.connectTo("driver", () => {

      ipc.of.driver.on("connect", () => {
        console.log("Device online");
      });

      ipc.of.driver.on("data", (command) => {
        console.log('Received command:', command.toString());
        self.processCommand(command);
        console.log('Processing petition:');
      });

    });
  }

  /**
   * Checks the command and processes it
   * @param command
   */
  processCommand(command) {
    const self = this;
    setTimeout(() => {
      if (command == Constants.STABLE_NET_WEIGHT) {
        ipc.of.driver.emit(self.getRandomResult());
      } else if (command == Constants.EXIT) {
        ipc.of.driver.emit(Constants.EXIT);
        process.exit();
      } else {
        ipc.of.driver.emit(`Unable to recognize command ${command}`);
      }
    },3000);
  };

  /**
   * Simulates the different possible states of the device
   * 70% -> OK
   * 30% -> KO (10% -> Busy, 10% Overload, 10% Underload)
   *
   * @returns {string}
   */
  getRandomResult() {
    let result = 'Sending state: ';
    const x = Math.floor(Math.random() * 100);
    if (x < 70) {
      result += 'S_S_____100.00_g';
    } else if (x < 80) {
      result += 'S_I';
    } else if (x < 90) {
      result += 'S_+';
    } else {
      result += 'S_-';
    }
    console.log(result + '\n');
    return result;
  };
}

new Device();

module.exports = { Device };
