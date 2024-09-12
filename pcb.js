// Define the Process class
class Process {
    constructor(id, executionTime, arrivalTime) {
        this.id = id; // Process ID (p1, p2, p3, etc.)
        this.totalExecutionTime = executionTime; // Total execution time (number of quantum the process needs to run)
        this.remainingTime = executionTime; // Remaining time to execute
        this.arrivalTime = arrivalTime; // Arrival time of the process
        this.startTime = null; // When the process starts
        this.endTime = null; // When the process finishes
        this.state = 'new'; // Initial state of the process
    }

    // Set the process state
    setState(state) {
        this.state = state;
    }

    // Set the start time when the process begins execution
    setStartTime(time) {
        if (this.startTime === null) {
            this.startTime = time; // Set start time when it first starts running
        }
    }

    // Set the end time when the process finishes execution
    setEndTime(time) {
        this.endTime = time;
    }

    // Calculate Turnaround Time (Finish Time - Arrival Time)
    calculateTurnaroundTime() {
        return this.endTime - this.arrivalTime;
    }

    // Calculate Wait Time (Start Time - Arrival Time)
    calculateWaitTime() {
        return this.startTime - this.arrivalTime;
    }

    // Process Utilization (execution time / total time)
    calculateUtilization() {
        const totalTime = this.endTime - this.startTime;
        return this.totalExecutionTime / totalTime;
    }

    // Simulate execution of the process for a quantum size
    executeForQuantum(quantumSize, currentTime) {
        // Set start time if it's the first execution
        this.setStartTime(currentTime);

        // Execute for the quantum size or remaining execution time, whichever is smaller
        const executedTime = Math.min(quantumSize, this.remainingTime);
        this.remainingTime -= executedTime; // Reduce remaining time
        return executedTime; // Return how much time this process executed
    }

    // Check if the process has finished
    isFinished() {
        return this.remainingTime <= 0;
    }
}

// Define the Scheduler class to manage the processes
class Scheduler {
    constructor() {
        this.processes = []; // Array to store the processes
        this.completedProcesses = []; // Array to track completed processes
    }

    // Add a process to the scheduler
    addProcess(executionTime) {
        const id = `p${this.processes.length + 1}`;
        const arrivalTime = this.processes.length; // Arrival times: 0, 1, 2, etc.
        const process = new Process(id, executionTime, arrivalTime);
        this.processes.push(process);
    }

    // Simulate the round-robin scheduling with quantum size
    run(quantumSize) {
        let currentTime = 0;
        let allProcessesCompleted = false;
 
        // Keep running until all processes are completed
        while (!allProcessesCompleted) {
            allProcessesCompleted = true; // Assume all processes are finished unless we find one that's not

            // Loop through all processes to simulate round-robin scheduling
            this.processes.forEach((process) => {
                // Only run processes that haven't finished yet
                if (!process.isFinished()) {
                    allProcessesCompleted = false; // If at least one process is not finished, we continue the loop
                    
                    // Process execution
                    const executedTime = process.executeForQuantum(quantumSize, currentTime);
                    currentTime += executedTime; // Increment the current time by how much was executed

                    // If the process finishes, set its end time
                    if (process.isFinished()) {
                        process.setEndTime(currentTime);
                        this.completedProcesses.push(process); // Track completed processes
                    }
                }
            });
        }

        // Print the process control block details for all completed processes
        this.completedProcesses.forEach((process) => {
            console.log(`Process ID: ${process.id}`);
            console.log(`Arrival Time: ${process.arrivalTime}`);
            console.log(`Start Time: ${process.startTime}`);
            console.log(`End Time: ${process.endTime}`);
            console.log(`Turnaround Time: ${process.calculateTurnaroundTime()}`);
            console.log(`Wait Time: ${process.calculateWaitTime()}`);
            console.log(`Utilization: ${process.calculateUtilization().toFixed(2)}`);
            console.log('------------------------------');
        });
    }
}

// User input to enter how many processes and execution time for each
const numProcesses = parseInt(prompt("Enter the number of processes:"));
const scheduler = new Scheduler();

// For each process, get execution time and add it to the scheduler
for (let i = 0; i < numProcesses; i++) {
    const executionTime = parseInt(prompt(`Enter execution time (in time units) for process p${i + 1}:`));
    scheduler.addProcess(executionTime);
}

// Ask for the quantum size for running the scheduler
const quantumSize = parseInt(prompt("Enter the quantum size for each process execution:"));

// Run the scheduler
scheduler.run(quantumSize);
