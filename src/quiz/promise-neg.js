function checkNegatives(arr) {
    return new Promise((resolve, reject) => {
        const promises = arr.map(subArray => {
            return new Promise((subResolve) => {
                const hasNegative = subArray.some(num => num < 0);
                if (hasNegative) {
                    subResolve(subArray);
                } else {
                    subResolve(null);
                }
            });
        });

        Promise.all(promises)
            .then(rowsWithNegatives => {
                const filteredRows = rowsWithNegatives.filter(row => row !== null);
                resolve(filteredRows);
            })
            .catch(error => {
                console.log('Error in processing subarrays:', error);
                reject(error);
            });
    });
}

// Example usage:
const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];

checkNegatives(array2D)
    .then(rows => {
        rows.forEach(row => {
            console.log('Row with negative numbers:', row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });