const { Driver } = require('./../driver.js');

let driver;

beforeEach(() => {
  driver = new Driver();
});

test('data from device is parsed', () => {
  const data = 'Sending state: S_S_____100.00_g';
  const deviceData = driver.parseDeviceData(data);

  const result = driver.formatData(deviceData);

  const expected = { command: 'S', value: '100.00', unit: 'g'};

  expect(deviceData).toEqual(expected);
  expect(result).toEqual(`The current stable weight is ${deviceData.value} ${deviceData.unit}`);
});

test('data with command S gets formatted', () => {
  const data = { command: 'S', value: '100.00', unit: 'g'};
  const result = driver.formatData(data);

  expect(result).toEqual(`The current stable weight is ${data.value} ${data.unit}`);
});

test('data with command I gets formatted', () => {
  const data = { command: 'I'};
  const result = driver.formatData(data);

  expect(result).toEqual('Command not executable. Balance is busy');
});

test('data with command + gets formatted', () => {
  const data = { command: '+', value: '100.00', unit: 'g'};
  const result = driver.formatData(data);

  expect(result).toEqual('Balance is in overload range');
});

test('data with command - gets formatted', () => {
  const data = { command: '-', value: '100.00', unit: 'g'};
  const result = driver.formatData(data);

  expect(result).toEqual('Balance is in underload range');
});
