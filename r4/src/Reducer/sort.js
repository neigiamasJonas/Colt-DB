// function sortReducer(state, action) {

//     let newState;

//     switch(action.type) {

//         case "ID":
//             newState = action.payload.sort((a, b) => (a.id - b.id))

//             break;

//         case "KM":
//             newState = action.payload.sort((a, b) => (a.km - b.km))
    
//             break;

//         case "Date":
//             newState = action.payload.sort((a, b) => a.date.localeCompare(b.date))
        
//             break;

//         default:
//             newState = [...state]
//     }


//     return newState
// }

// export default sortReducer;