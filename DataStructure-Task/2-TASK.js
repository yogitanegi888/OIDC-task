function oddoccurring(array) {
    let countMap = new Map();
    let result = []
    console.log(countMap)
    for (let i = 0; i < array.length; i++) {
        let ch = array[i];
        if (!countMap.has(ch)) countMap.set(ch, 0);
        countMap.set(ch, countMap.get(ch) + 1);
    }
    console.log("countMap", countMap)
    for (let [key, value] of countMap.entries()) {
        if (value % 2 == 1);
        result.push(key)

    }
    return result

}

let array = [4, 3, 6, 2, 4, 2, 3, 4, 3, 3]
const finalResult = oddoccurring(array)
console.log(finalResult)