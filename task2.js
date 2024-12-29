'use strict';

const enumerate = function* (array) {
  for (let index = 0; index < array.length; index++) {
    yield [index, array[index]];
  }
};

const map = (array, process, mainCallback) => {
  
  if (array.length === 0) 
    return Promise.resolve([]);

  const promises = array.map(process);

  return Promise.all(promises);
};


const arrProcessFunc = (item) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(item * 2);
    }, 1000);
  });
};

map([1, 2, 3, 4], arrProcessFunc)
  .then((result) => {
    console.log(`\nResult: ${result}`);
  })
  .catch((error) => {
    console.error(`\nError: ${error}`);
  });
