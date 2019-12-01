const ipc = require('node-ipc');
const { UI } = require('./ui');
const { Constants } = require('./constants');

class Driver {

  constructor() {
    this.setup();
    const testMode = typeof global.test === 'function';
    if (!testMode) {
      this.startDriver();
    }
  }

  setup() {
    ipc.config.id = 'driver';
    ipc.config.rawBuffer=true;
    ipc.config.encoding='ascii';
  }

  startDriver() {
    const self = this;
    ipc.serve(() => {

      ipc.server.on('connect', (socket) => {
        console.log('Driver listening\n\n');
        self.waitForUserOrders(socket);
      });

      ipc.server.on('data', (data, socket) => {
        if (data.toString() != Constants.EXIT) {
          // Parse the received data to get command, value and unit
          const deviceData = self.parseDeviceData(data.toString());
          // Format the received data into a more readable text
          const formattedData = self.formatData(deviceData);
          console.log(formattedData + '\n');
          // Wait for a new order
          self.waitForUserOrders(socket);
        } else {
          process.exit();
        }
      });
    });

    ipc.server.start();
  }

  /**
   * Prompts instructions to the user and waits for commands
   * @param socket
   * @returns {Promise<void>}
   */
  async waitForUserOrders(socket) {
    const command = await new UI()
      .prompt(
        `Type 's' to fetch the balance net weight\nOr 'e' to end the execution:\n`
      );
    console.log('Sending command:', command);
    ipc.server.emit(socket, command);
  };

  /**
   * Parses data received from device to get command, value and unit
   * @param data
   * @returns {{unit: *, value: *, command: *}}
   */
  parseDeviceData(data) {
    const deviceData = data.split("_");
    const command = deviceData[1];
    const value = deviceData[deviceData.length-2];
    const unit = deviceData[deviceData.length-1];
    return { command, value, unit };
  };

  /**
   * Formats the device data into a more readable string
   * @param data
   */
  formatData(data) {
    let result;
    switch (data.command) {
      case 'I':
        result = 'Command not executable. Balance is busy';
        break;
      case '+':
        result = 'Balance is in overload range';
        break;
      case '-':
        result = 'Balance is in underload range';
        break;
      default:
        result = `The current stable weight is ${data.value} ${data.unit}`;
    }
    return result
  };

}

new Driver();

module.exports = { Driver };
