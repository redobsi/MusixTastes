/* 📝 Description:
This script provides a concise and reusable implementation of a one-shot background task,
designed to be inherited by other scripts. It handles load balancing,
communication with Python scripts, and error logging using electron-log.
The BackgroundScript class simplifies the setup and execution of background tasks,
making the code shorter and more manageable.
*/


// Import required modules
const { PythonShell } = require('python-shell');
const { ipcRenderer } = require('electron');
const loadBalancer = require('electron-load-balancer');
const path = require('path');
const log = require('electron-log');

// Define a class for the one-shot background task
export default class BackgroundScript {
    constructor(process_name, script_name) {
        // Set the process name for load balancing
        this.PROCESS_NAME = process_name;
        this.SCRIPT_NAME = script_name

        // Set up the PythonShell instance
        this.pyshell = new PythonShell(path.join(__dirname, `/../scripts/${this.SCRIPT_NAME}.py`), {
            pythonPath: 'python3',
        });
    }

    // Start the one-shot background task
    start() {
        // Set up load balancing for the task
        loadBalancer.job(
            ipcRenderer,
            this.PROCESS_NAME, 
            () => {
                loadBalancer.onReceiveData(
                    ipcRenderer,
                    this.PROCESS_NAME,
                    this.onDataReceived.bind(this)
                )
                // Hook to receive error from Python realm
                this.pyshell.on('stderr', this.onPythonStderr.bind(this));

                // Hook to receive data from Python realm
                this.pyshell.on('message', this.onPythonMessage.bind(this))
            },
            this.onLoadBalancerCleanup.bind(this)
        );
    }

    // Callback for loadBalancer job cleanup
    onLoadBalancerCleanup() {
        // Cleanup PythonShell when cleanup callback is called
        this.pyshell.terminate();
    }

    // Callback for Python stderr event
    onPythonStderr(stderr) {
        log.error(stderr);
    }

    // This is an abstract method
    // Callback for Python message event
    onPythonMessage() {
        throw new Error("Abstract method not implemented");
    }

    // Callback for Python when data is received 
    onDataReceived(data) {
        log.info({ data });
        this.pyshell.send(JSON.stringify(data));
    }

}
