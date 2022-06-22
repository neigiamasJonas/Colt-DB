import { useState, useEffect } from 'react';
import './App.scss';
import Create from './Components/Create';
import Edit from './Components/Edit';
import FaultList from './Components/List';
import ScootersInfo from './Components/ScootersInfo';
import ScootersSort from './Components/ScootersSort';
// import { create, edit, read, remove } from './Functions/LocalStorage';

import axios from 'axios';
import ScootersContext from './Components/ScooterContext';
import { useReducer } from 'react';
import sortReducer from './Reducer/sort';


function App() {

    const [faults, setFaults] = useState(null);
    

  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [scooterSort, setScooterSort] = useState('1');

  // SORTINGAS
  const [scooters, dispachScooters] = useReducer(sortReducer, [])



  // last update component (paskutinio localStorage update laikas), kad atsinaujintu ne po refresh
  const [lastUpdate, setLastUpdate] = useState(Date.now());



  ////////////////
  // READ //


  useEffect(() => {
    
    axios.get('http://localhost:3003/scooters')
    .then(res => {
     
        setFaults(res.data)
        dispachScooters({ payload: res.data})

    })

  }, [lastUpdate]);



////////////////
  // CREATE //

  useEffect(() => {
    if (createData === null){
      return;
    }

    axios.post('http://localhost:3003/scooters', createData)
    .then(_ => {
        

        setLastUpdate(Date.now()); 
    })
    
  }, [createData]);


 //////////////// 
  // REMOVE //

  useEffect(() => {

    if (deleteData === null) {
      return;
    }

    axios.delete('http://localhost:3003/scooters/' + deleteData.id)
    .then(_ => {
        

        setLastUpdate(Date.now()); 
    })

    

  }, [deleteData])

  ////////////////
  // EDIT //

  useEffect (() => {

    if (editData === null) {
      return;
    }

    axios.put('http://localhost:3003/scooters/' + editData.id, editData)
    .then(_ => {

        setLastUpdate(Date.now()); 

    })

  }, [editData]);


  ////////////////
  // SORT //

  useEffect(() => {

    dispachScooters({type: scooterSort})
     
  }, [scooterSort])



  return (
    <ScootersContext.Provider value={
        {
            faults,
            setCreateData,
            setDeleteData,
            setEditData,
            modalData,
            setModalData,
            scooterSort, 
            setScooterSort,
            scooters
        }
    }>
    <div>
      <div className='header'><b>"Fault" paspirtuku nuoma</b></div>
      <div className='container'>
        <div className='row'>
          <div className='row-col1'>
            <Create></Create>
            <ScootersInfo></ScootersInfo>
          </div>
          <div className='row-col2'>
            <ScootersSort></ScootersSort>
            <FaultList></FaultList>
          </div>
        </div>
      </div>
    </div>
    {modalData && <Edit></Edit>}
    </ScootersContext.Provider>
  );
}

export default App;