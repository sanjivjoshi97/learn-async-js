function sum2DArray(arr) {
    return new Promise((resolve, reject) => {
        console.log('Sum called ... ');
        if(Array.isArray(arr)) {
            const promises = arr.map(subArray => {
                return new Promise((subResolve) => {
                    let sum = 0;
                    for (let j = 0; j < subArray.length; j++) {
                        sum += subArray[j];
                    }
                    subResolve(sum);
                });
            });

            Promise.all(promises)
                .then(subArraySums => {
                    const totalSum = subArraySums.reduce((acc, curr) => acc + curr, 0);
                    console.log('resolving ... ');
                    resolve(totalSum);
                })
                .catch(error => {
                    console.log('Error in processing subarrays:', error);
                    reject(error);
                });
        }
        else {
            console.log('rejecting ... ');
            reject('BAD INPUT: Expected array as input');
        }
        console.log('returning from sum');
    });
}

// Example usage:
const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const sumPromise1 = sum2DArray(array2D);
sumPromise1.then(result => {
    console.log('Sum of array1:', result);
}).catch(error => {
    console.error('Error:', error);
});
