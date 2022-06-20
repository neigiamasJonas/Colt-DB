import { useContext } from "react";
import Fault from "./Fault";
import ScootersContext from "./ScooterContext";

function FaultList() {

    const {faults} = useContext(ScootersContext);

    return (
    <>
        <div className='col2 column'>
            <div className="h3">
                <h3>List of Scooters</h3>
            </div> 
            <div className='card-body'>
                <ul className="ul">
                    {
                    faults !== null ? [...faults].map(fault => <Fault key={fault.id} fault={fault}></Fault>) : null
                    }

                </ul>
            </div>
        </div>

    </>
    )
}

export default FaultList;