import { useContext } from "react";
import ScootersContext from "./ScooterContext";

function ScootersInfo() {

    const {faults} = useContext(ScootersContext)


    return(
        <>
            <div className="column">
                <div className="h3">
                    <h3>Scooters Data</h3>
                </div>
                <div className="card-body">
                    <div className="info-item">
                        <div>Scooters count: </div>
                        <div><b>
                            {
                                faults === null ? null : faults.length
                            }
                        </b></div>
                    </div>
                    
                    <div className="info-item">
                        <div>Total Km: </div> 
                        <div><b>
                            {
                                faults === null ? null : (faults.reduce((value, index) => (value + (+index.km)), 0)).toFixed(2)
                            }
                            km</b>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ScootersInfo;