'use strict';

const map = (array, process, mainCallback) => {
  
  if (array.length === 0) 
    return void mainCallback(null, []);
  
  const result = new Array(array.length);
  let completed = false;
  let counter = 0;
  
  for (const item of array) {
    
    const itemIndex = counter++;

    process(item, (e, funcResult) => {
      
      if (e) {
        completed = true;
        return void mainCallback(e, null);
      }
      if (completed) return;
      
      result[itemIndex] = funcResult;

      if (itemIndex === array.length - 1) 
        mainCallback(null, result);
    });
  }
};

const arrProcessFunc = (item, callback) => {
  setTimeout(callback, 1000, null, item * 2);
};

map([1, 2, 3, 4], arrProcessFunc, (error, result) => {
  console.log(`\nResult: ${result}\nError: ${error}\n`);
});
