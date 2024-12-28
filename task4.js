'use strict';

const asyncGenerator = (array) => {
    return {
        async *[Symbol.asyncIterator]() {
            for (const item of array) {
                yield new Promise((resolve) =>
                    setTimeout(() => resolve(item), Math.random() * 1000)
                );
            }
        }
    };
};

const asyncMap = async (items, callback, signal) => {
    const result = [];

    for await (const item of items) {
        if (signal.cancelled) {
            throw new Error("Aborted");
        }
        console.log(await callback(item));
        result.push(await callback(item));
    }

    return result;
}

const demo = async (numbers) => {
    const signal = { cancelled: false };

    const processNumbers = (num) => Promise.resolve(num * 2);

    try {
        const iterableNumbers = asyncGenerator(numbers);

        setTimeout(() => {
            console.log("Aborting...");
            signal.cancelled = true;
        }, 1500);

        const res1 = await asyncMap(iterableNumbers, processNumbers, signal);
        console.log(`Results: ${res1}`);
    } catch (err) {
        if (err.message === "Aborted") {
            console.error("Case was aborted");
        } else {
            console.error("Error:", err);
        }
    }
}

demo([1, 2, 3, 4])
    .then(() => console.log("Demo complete success"))
    .catch((err) => console.error(`There is an error in Demo: ${err}`));
