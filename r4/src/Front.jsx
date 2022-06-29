
import { useState, useEffect } from "react";
import axios from 'axios';
import FrontContext from "./Components/Front/FrontContext";
import FaultList from "./Components/List";

function Front() {

    const [scooters, setScooters] = useState(null);
    const [colors, setColors] = useState(null);

    const [createUser, setCreateUser] = useState(null);

    const [lastUpdate, setLastUpdate] = useState(Date.now());


    // get scooter data
    useEffect(() => {
        axios.get('http://localhost:3005/front/scooters')
        .then(res => {
            setColors(res.data)

        })
    }, [lastUpdate]);

    
    // Create user
     useEffect(() => {
        if (null === createUser) return;
        axios.post('http://localhost:3004/front/users', createUser)
        .then(_ => {
            setLastUpdate(Date.now())
        
        })
    
    }, [createUser]);

    return(
        <FrontContext.Provider value={
            {
                scooters,
                colors,
                setCreateUser
            }
        }>
            <div>
                <div className='header'><b>"Fault" paspirtuku nuoma</b></div>
                    <div className='container'>
                        <div className='row'>
                            <div className='row-col1'>
                
                        </div>
                            <div className='row-col2'>
                                
                    
                        </div>
                    </div>
                </div>
            </div>
      
        </FrontContext.Provider>
    )
}


export default Front;