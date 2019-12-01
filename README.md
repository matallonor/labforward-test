# Labforward test

Simple MVP to illustrate how asynchronous communication between a lab device and its driver works

### Prerequisites

In order to run this project it is required to have installed:

- node
- npm
- nvm (optional)

### Installing

To install all required dependencies go to the project root and run

    npm install

## Running the tests

To execute the tests go to the project root and run

    npm run test
    
## Getting Started

To execute the program go to the project root and run

    npm run start

Important!
The above command will execute the script ./Makefile, which contains the next two line:
    gnome-terminal -e 'node ./device.js'
	gnome-terminal -e 'node ./driver.js'
This file is assuming that a gnome-terminal is available on the OS.

If it is not the case, feel free to change those lines to use another terminal, or just open two terminal
windows and type:
    
    node ./device.js
    node ./driver.js

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Considerations

This is a coding task to show my ability to create a program with two processes communicating asynchronously to each other. Given my lack of experience in this kind of development, I have found appropriate to make use of the node-ipc module to deal with the more complex issues.

I am perfectly able to implement a file-based asynchronous communication between two processes using the node built-in streams and child-process modules, but I thought that maybe using the mentioned node-ipc module would be more interesting.

There are some things that could have been done better:

- Error handling: Currently there is no error handling, which is a shame (no excuses).

- Code structure: Instead of having all the code in the root folder of the project, it might be interesting to have it separated in different folders organized per concerns. Now there are only 4 scripts, but in the future it would be unmaintainable.

- Testing: There are few tests and none of the asynchronous functionality is covered.

- Use of promises: Although the module used to develop the asynchronous communication is not promise-based, it could have been wrapped in internal functions that returned as Promises.

- Other: 
    On driver.js formatData() method, instead of having a switch to format the data, a data structure encapsulating this business logic could have been implemented.
    On device.js, instead of a callable method (getRandomResult()) to randomly get the simulated state of the device, a DeviceState class on its own could have been created that, once instantiated, it keeps randomly changing its state. That way, the device.js process just has to instantiate it and, whenever a command arrives, ask for the current state.

Those were just a few of the improvements that should have been addressed to consider the task done.
