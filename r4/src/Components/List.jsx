import { useContext } from "react";
import Fault from "./Fault";
import ScootersContext from "./ScooterContext";

function FaultList() {

    const {scooters} = useContext(ScootersContext);

    console.log(scooters)

    return (
    <>
        <div className='col2 column'>
            <div className="h3">
                <h3>List of Scooters</h3>
            </div> 
            <div className='card-body'>
                <ul className="ul">
                    {
                    scooters.map(fault => <Fault key={fault.id} fault={fault}></Fault>) 
                    }

                </ul>
            </div>
        </div>

    </>
    )
}

export default FaultList;