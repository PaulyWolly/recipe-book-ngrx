
const waits = [3000, 1000];
const value = 'Hello from Paul';

// tslint:disable-next-line:no-shadowed-variable
export const setDelay = (times: any[], value: string) => {
    if (times.length > 0) {
      // Remove the first time from the array
      const wait = times.shift();
      // tslint:disable-next-line:no-unused-expression
      console.log('Waiting... for ', wait);

      // Wait for the given amount of time
      setTimeout(() => {
          console.log('Waited. ', wait);
          console.log(value);
          console.log();
          // Call the setDelay function again with the remaining times
          setDelay(times, value);
      }, wait);
    }
  };

setDelay(waits, value);
