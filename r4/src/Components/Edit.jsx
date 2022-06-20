import { useContext } from 'react';
import { useState, useEffect } from 'react';
import RandomStringID from '../Functions/RandStringID';
import ScootersContext from './ScooterContext';

function Edit() {

    const {modalData, setModalData, setEditData} = useContext(ScootersContext);

    /// today's date
    const data = new Date().toISOString().slice(0, 10)

    /// checkBox 
    const [busy, setBusy] = useState (0)

    
    /// data constants
    const [state, setState] = useState("New");

    const [id, setId] = useState(1);

    const [reg_code, setReg_code] = useState(RandomStringID);

    const [km, setKm] = useState(0);
    const [km2, setKm2] = useState(0);

    const [date, setDate] = useState('');
    const [newdate, setNewdate] = useState(data);

    


    useEffect(() => {
        if(modalData === null) {
            return;
        }

        setState(modalData.state);
        setId(modalData.id);
        setReg_code(modalData.reg_code);
        

        setKm(modalData.km);
        setKm2(0)

        setDate('');

        const data2 = new Date().toISOString().slice(0, 10)
        setNewdate(data2)

        setBusy(modalData.busy)


    }, [modalData]);


    const handleEdit = () => {
        const data = {id: modalData.id, reg_code, state, km: (+(modalData.km) + +(km2)), date: newdate, busy: busy ? true : false} // 

        setEditData(data)
        setModalData(null);  
    }


    
    if (setModalData === null) {
        return null;
    }

    return(
        <>
        <div className="modal">
            <div className="modal-box">
                <div className="modal-content">
                    <button type="button" className="close-button" onClick={() => setModalData(null)}>
                        <span>x</span>
                    </button>
                    <div className="modal-header">
                        <h4 className="modal-title">Faults edit</h4>
                    </div>

                    <div className="modal-body">
                        <div className="modal-id">
                            <label>ID:</label>
                            <div>{id}</div>
                        </div>
                        <div className="modal-reg">
                            <label>Reg Code:</label>
                            <div>{reg_code}</div>
                        </div>
                        <div className='modal-group'>
                            <label>New or Used</label>
                            <select value={state} onChange={e => setState(e.target.value)}>
                            {
                                state === 'New' && <option value="New">New</option>
                            }
                            <option value="Used">Used</option>
                            </select>
                        </div>
                        <div>
                            {
                            state === 'Used' && (
                                <div className='hidden-group'>
                                    <div className='modal-group'>
                                        <label>Run before (km)</label>
                                        <div><b>{km} km</b></div>
                                        <label>Run today (km)</label>
                                        <input type="number" value={km2} onChange={e => setKm2(e.target.value)}></input>
                                    </div>
                                    <div className='modal-group'>
                                        <div className='modal-date'>
                                            <label>Last time used</label>
                                            <input style={{marginLeft: '4px'}} type="date" readOnly value={date}></input>
                                        </div>
                                        <div className='modal-date'>
                                            <label>New date entry</label>
                                            <input type="date" value={newdate} onChange={e => setNewdate(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className='checkbox'>
                                        
                                        <input type="checkbox" onChange={() => setBusy(busy ? 0 : 1)} checked={busy ? 1 : 0}></input>
                                        <b>Busy</b>
                                    
                                    </div>
                            </div>
                            )
                            }
                        </div>

                        <div className='modal-footer'>
                            <button type='button' className='button' onClick={() => setModalData(null)}>Close</button>
                            <button type='button' className='button' onClick={handleEdit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Edit;