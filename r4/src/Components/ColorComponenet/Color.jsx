import { useContext } from "react";
import ColorContext from "./ColorContext";


function Color({ color }) {

    const {setDeleteData} = useContext(ColorContext);

    
    const handleDelete = () => {
        setDeleteData(color);
    }



    return (
        <>
            
                <div className="card-body" style={{padding: "10px 20px", borderTop: '1px solid black'}}>
                    <div className="info-item" >
                        <div>{color.color_title}</div>
                        <div className="content-btn" >
                            {
                                color.scooter_count ? '('+ color.scooter_count + ')' : <button type="button" className="btn btn2" onClick={handleDelete}>Delete</button>
                            }
                        </div>
                    </div>
                </div>
            
        </>
    )
}

export default Color;