
import { useState, useContext } from 'react';
import ColorContext from './ColorContext';


function CreateColor() {

    const {setCreateData} = useContext(ColorContext)

    const [color_title, setColor_title] = useState("");


    const handleCreate = () => {
      const data = {color_title};
      
      setCreateData(data);
      setColor_title("")
      
    }

    return (
        <div className='col1 column'>
            <div className='h3'>
              <h3>Create New Color</h3>
            </div>
            <div className='card-body'>
              <div className='form-group-row'>
                <div className='form-group'>
                  <label>Color Title</label>
                  <input type="text" value={color_title} onChange={e => setColor_title(e.target.value)}/>
                  <small>Enter color title here</small>
                </div>
              </div>
              <button className='button' onClick={handleCreate}>Create</button>
            </div>
        </div>
    )
}

export default CreateColor;