const arr = [1, 2, 2, 3, 3, 3, 4, 4];

function func(arr) {
    let counts = {};

    arr.forEach((el) => {
        counts[el] = (counts[el] || 0) + 1;
    });

    return Math.max(...Object.values(counts));
}

console.log(func(arr));
