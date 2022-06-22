function sortReducer(state, action) {

    let newState;

    switch(action.type) {

        case "1":
            newState = [...state].sort((a, b) => (a.id - b.id))

            break;

        case "2":
            newState = [...state].sort((a, b) => (b.km - a.km))
    
            break;

        case "3":
            newState = [...state].sort((a, b) => a.date.localeCompare(b.date))
        
            break;

        default:
            newState = [...action.payload]
    }


    return newState
}

export default sortReducer;