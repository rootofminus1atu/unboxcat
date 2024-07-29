export function randomChoice(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    return arr[randomIndex]
}

export function randomChoiceOrDefault(arr, defaultElem) {
    if (arr.length === 0) {
        return defaultElem
    }

    return randomChoice(arr)
}