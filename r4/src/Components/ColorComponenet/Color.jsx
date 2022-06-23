import { useContext } from "react";
import ColorContext from "./ColorContext";


function Color({ color }) {

    const {setDeleteData} = useContext(ColorContext);

    
    const handleDelete = () => {
        setDeleteData(color);
    }



    return (
        <>
            <div className="column">
                <div className="h3" >
                    <h3 style={{margin: "5px"}}>Scooters Data</h3>
                </div>
                <div className="card-body" style={{padding: "10px 20px"}}>
                    <div className="info-item">
                        <div>{color.title}</div>
                        <div className="content-btn">
                            <button type="button" className="btn btn2" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Color;