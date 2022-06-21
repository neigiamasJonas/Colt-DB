function sortReducer(state, action) {

    let newState;
console.log(action.payload)

console.log(action.type)
console.log(state)
    switch(action.type) {

        case "1":
            newState = [...state].sort((a, b) => (a.id - b.id))

            break;

        case "2":
            newState = [...state].sort((a, b) => (a.km - b.km))
    
            break;

        case "3":
            newState = [...state].sort((a, b) => a.date.localeCompare(b.date))
        
            break;

        default:
            newState = [...action.payload]
    }

console.log(newState)
    return newState
}

export default sortReducer;