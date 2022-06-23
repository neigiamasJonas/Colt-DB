import { useContext } from "react";
import Color from "./Color";
import ColorContext from "./ColorContext";



function ColorList() {

    const {colors} = useContext(ColorContext);

    return (
    <>
        <div className='col2 column'>
            <div className="h3">
                <h3>List of Colors</h3>
            </div> 
            <div className='card-body'>
                <ul className="ul">
                    {
                    colors ? colors.map(color => <Color key={color.id} color={color}></Color>) : null
                    }

                </ul>
            </div>
        </div>

    </>
    )
}

export default ColorList;