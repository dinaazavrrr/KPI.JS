'use strict';

const enumerate = (array) => array.entries();

const map = (array, process, signal, mainCallback) => {
  
  if (array.length === 0) 
    return void mainCallback(null, []);
  
  const result = new Array(array.length);
  let completed = false;
  let counter = 0;
  
  /* abort signal */
  signal.addEventListener('abort', () => {
    completed = true;
    mainCallback(signal.reason, null);
  });
  
  for (const [index, item] of enumerate(array)) {
    
    process(item, (error, processed) => {
      if (error) {
        completed = true;
        return void mainCallback(error, null);
      }
      if (completed) return;
      
      result[index] = processed;
      counter++;
      
      if (counter === array.length) 
        mainCallback(null, result);
    });

  }
};

const arrProcessFunc = (item, callback) => {
  setTimeout(callback, 1000 - 100 * item, null, item * 2);
};

map([1, 2, 3, 4], arrProcessFunc, AbortSignal.timeout(500), (error, result) => {
  console.log(`\nResult: ${result}\nError: ${error}\n`);
});
