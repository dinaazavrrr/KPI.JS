'use strict';

const enumerate = function* (array) {
  for (let index = 0; index < array.length; index++) {
    yield [index, array[index]];
  }
};

const map = (array, process, mainCallback) => {
  
  if (array.length === 0) 
    return mainCallback(null, []);
  
  const result = new Array(array.length);
  let completed = false;
  let counter = 0;

  for (const [index, item] of array.entries()) {
    
    process(item, (e, funcResult) => {
      if (e) {
        completed = true;
        return mainCallback(e, null);
      }
      if (completed) return;
      
      result[index] = funcResult;
      counter++;

      if (counter === array.length) 
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
