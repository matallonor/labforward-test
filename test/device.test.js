const { Device } = require('./../device.js');

let device;

beforeEach(() => {
  jest.useFakeTimers();
  device = new Device();
});

test('command gets processed', () => {
  device.processCommand('s');

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 3000);
});

test('gets a random result string', () => {
  const result = device.getRandomResult();
  expect(result).toContain('Sending state:');
});
