// import axios from "axios";
// import { useReducer } from "react";
// import { useEffect } from "react";
import { useContext } from "react";

import ScootersContext from "./ScooterContext";

function ScootersSort() {

    const {scooterSort, setScooterSort} = useContext(ScootersContext)



    

    return(
        <>
        <div className="sort-body">
            <label>Sorted by: </label>
            <div>
                <select value={scooterSort} onChange={e => {
                    setScooterSort(e.target.value);
                    }}>
                    <option value="1">ID</option>
                    <option value="2">Total ride km</option>
                    <option value="3">Last time used</option>
                </select>
            </div>


        </div>
        </>
    )
}

export default ScootersSort;