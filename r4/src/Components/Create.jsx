
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import RandomStringID from '../Functions/RandStringID';
import ScootersContext from './ScooterContext';




function Create() {

    const {setCreateData} = useContext(ScootersContext)

    const [state, setState] = useState("New");

    // data values states
    const [id2, setId2] = useState(1);
    const [reg_code, setReg_code] = useState(RandomStringID(8));
    const [km, setKm] = useState(0);
    
  
   
    
    // handleCreat po mygtuko paspaudimo istume data i paruoshta masyva

    const handleCreate = () => {
      const data = {reg_code, state, km, busy: 0, date: 'Not set'};
      
      setCreateData(data);                          // uzsetinu data objekta cia, priestai tai buvo daroma App ir naudojamas propsas setCreateData
      // create(data);
      
  
      setReg_code(RandomStringID(8));
      setState('New');
      setKm(0);

      
    }


    useEffect(() => {

      axios.get('http://localhost:3003/scooters')
      .then(res => {

        setId2(res.data.length)

    
      })

    });





    return (
        <div className='col1 column'>
            <div className='h3'>
              <h3>Create New Item</h3>
            </div>
            <div className='card-body'>
              <div className='form-group-row'>
                <div className='form-group'>
                  <label>ID</label>
                  <input type="text" readOnly value={id2} />
                  <small>Auto generated</small>
                </div>
                <div className='form-group'>
                  <label>Registration Code</label>
                  <input type="text" readOnly value={reg_code} onChange={e => setReg_code(e.target.value)}/>
                  <small>Auto generated</small>
                </div>
              </div>
              <div div className='form-group-row'>
                <div className='form-group'>
                  <div className='show-group-item'>
                    <label>New or Used</label>
                    <select value={state} onChange={e => setState(e.target.value)}>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  {
                    state === 'Used' && (
                    <div className='show-group-item' style={{paddingBottom: '17px'}}>
                      <label>Run before (km)</label>
                      <input type="number" value={km} onChange={e => setKm(e.target.value)}></input>
                    </div>
                    )
                  }
                </div>
              </div>

              <button className='button' onClick={handleCreate}>Create</button>

            </div>
          </div>
    )
}

export default Create;