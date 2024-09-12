# pcb-design-implementation
# Round-Robin Process Scheduler

## Overview
This project implements a **Round-Robin Process Scheduling** algorithm in JavaScript. The scheduler simulates the execution of processes using a round-robin approach, where each process is given an equal share of the CPU time, defined by a time quantum. The implementation tracks key details like process wait time, turnaround time, and CPU utilization.

## Features
- **Process Class**: Each process is represented by the `Process` class, which includes attributes like process ID, execution time, remaining time, arrival time, and state (e.g., new, running, or finished).
- **Scheduler Class**: The `Scheduler` class manages multiple processes and simulates their execution using round-robin scheduling.
- **Time Quantum**: The CPU time is divided into equal intervals (quantum), and each process executes for a maximum of one quantum at a time before moving to the next.
- **Process Tracking**: The code tracks and outputs critical statistics for each process, such as:
  - Turnaround Time (Finish Time - Arrival Time)
  - Wait Time (Start Time - Arrival Time)
  - CPU Utilization (Execution Time / Total Time)

## How It Works
1. The user is prompted to input the number of processes and the execution time (in time units) for each process.
2. The scheduler runs the processes in a round-robin fashion, using a specified quantum size.
3. Once all processes have completed, the program prints the following details for each process:
   - Process ID
   - Arrival Time
   - Start Time
   - End Time
   - Turnaround Time
   - Wait Time
   - CPU Utilization

## Code Explanation

### Process Class
- `Process`: Represents an individual process with attributes for ID, execution time, remaining time, and state.
  - `executeForQuantum()`: Simulates execution for the given quantum time.
  - `isFinished()`: Checks if the process has completed execution.
  - `calculateTurnaroundTime()`: Computes the time taken from arrival to finish.
  - `calculateWaitTime()`: Computes the time a process waits before starting execution.
  - `calculateUtilization()`: Calculates CPU utilization.

### Scheduler Class
- `Scheduler`: Manages multiple processes and runs them using the round-robin algorithm.
  - `addProcess()`: Adds a new process to the scheduler.
  - `run()`: Executes the processes using round-robin scheduling and prints process details once completed.



