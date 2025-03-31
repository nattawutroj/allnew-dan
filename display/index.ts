import { CONCURRENCY_LIMIT } from "../config";

const RESET = "\x1b[0m";
const BLUE = "\x1b[34m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const CYAN = "\x1b[36m";
const MAGENTA = "\x1b[35m";

const Display = {
  blue: (msg) => console.log(BLUE + msg + RESET),
  green: (msg) => console.log(GREEN + msg + RESET),
  yellow: (msg) => console.log(YELLOW + msg + RESET),
  red: (msg) => console.log(RED + msg + RESET),
  cyan: (msg) => console.log(CYAN + msg + RESET),
  magenta: (msg) => console.log(MAGENTA + msg + RESET),
  normal: (msg) => console.log(RESET + msg + RESET),
};

export const display = [];
export const workers_monitor = [];

export function InitialDisplay() {
  display[0] = ""; // Store name
  display[1] = new Date(); // Start time
  display[2] = 0; // Request count
  display[3] = 0; // Currently processing
  display[4] = 0; // Number of processed brands
  display[5] = 0; // Total brands
  display[6] = 0; // Total products
}

export function startStatusLogger() {
  return setInterval(() => {
    console.clear();
    const currentTime = new Date();
    const startTime = display[1];

    const elapsedSec = (currentTime.getTime() - startTime.getTime()) / 1000;

    let remainingTimeSec = 0;
    if (display[5] > 0 && display[4] > 0) {
      const progress = display[4] / display[5];
      if (progress > 0) {
        const totalEstimatedTime = elapsedSec / progress;
        remainingTimeSec = (totalEstimatedTime - elapsedSec) / 60;
      }
    }

    Display.yellow(`========== Status Monitor ==========`);
    Display.green(`Store Name       : ${display[0] || "N/A"}`);
    Display.yellow(`Current Time     : ${currentTime.toLocaleTimeString()}`);
    Display.cyan(`Start Time       : ${startTime.toLocaleTimeString()}`);
    Display.magenta(`Elapsed Time     : ${elapsedSec.toFixed(2)} seconds`);
    
    const requestPerSec = display[2] / elapsedSec;
    const percentProgress = display[5] > 0 ? (display[4] / display[5]) * 100 : 0;
    
    Display.magenta(`Request Per Second: ${requestPerSec.toFixed(2)} req/s`);
    Display.cyan(`Progress         : ${percentProgress.toFixed(2)} %`);

    if (remainingTimeSec > 0) {
      Display.magenta(
        `Estimated Finish : ~${remainingTimeSec.toFixed(2)} Minute from now`
      );
    } else {
      Display.magenta(`Estimated Finish : Calculating...`);
    }
    Display.normal(`Request Count    : ${BLUE}${display[2]}`);
    Display.green(`Processing Now   : ${RESET}${display[3]}`);
    Display.green(`Brands           : ${display[4]}/${display[5]}`);
    Display.green(`Total Products   : ${display[6]}`);

    Display.yellow(`------ Worker Status (${CONCURRENCY_LIMIT}) ------`);
    for (let i = 0; i < CONCURRENCY_LIMIT; i++) {
      const workerStatus = workers_monitor[i] || "Idle";
      Display.normal(`Worker ${i + 1} : ${workerStatus}`);
    }

    Display.yellow(`====================================`);
  }, 100);
}
