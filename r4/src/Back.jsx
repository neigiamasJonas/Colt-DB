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
import ColorContext from './Components/ColorComponenet/ColorContext';
import CreateColor from './Components/ColorComponenet/CreateColor';
import ColorList from './Components/ColorComponenet/ListColor';
// import UserContext from './Components/Users/UserContext';


function App() {

    const [faults, setFaults] = useState(null);
    
  /// SCOOTERS

  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [scooterSort, setScooterSort] = useState('1');

  /// COLORS

  const [colors, setColors] = useState(null);
  const [createDataColors, setCreateDataColors] = useState(null);
  const [deleteDataColors, setDeleteDataColors] = useState(null);




  // SORTINGAS
  const [scooters, dispachScooters] = useReducer(sortReducer, [])

  // last update component (paskutinio localStorage update laikas), kad atsinaujintu ne po refresh
  const [lastUpdate, setLastUpdate] = useState(Date.now());



  ////////////////
  // READ //


  useEffect(() => {
    
    axios.get('http://localhost:3005/scooters')
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

    axios.post('http://localhost:3005/scooters', createData)
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

    axios.delete('http://localhost:3005/scooters/' + deleteData.id)
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

    axios.put('http://localhost:3005/scooters/' + editData.id, editData)
    .then(_ => {
console.log(editData)
        setLastUpdate(Date.now()); 

    })

  }, [editData]);


  ////////////////
  // SORT //

  useEffect(() => {

    dispachScooters({type: scooterSort})
     
  }, [scooterSort])


/////////////////////////////////////////////////////////
//////////////  Scooters_color   ////////////////////////

// CREATE // 

  useEffect(() => {
    if (null === createDataColors) return;
    axios.post('http://localhost:3005/scooters_color', createDataColors)
      .then(_ => {
        
        setLastUpdate(Date.now());
      })

  }, [createDataColors]);

  // READ //

    useEffect(() => {
      axios.get('http://localhost:3005/scooters_color')
        .then(res => {
          // console.log(res.data);
          setColors(res.data)});
    }, [lastUpdate]);
  
  
  // DELETE //

    useEffect(() => {
      if (null === deleteDataColors) {
          return;
      }
  
      axios.delete('http://localhost:3005/Scooters_color/' + deleteDataColors.id) /// PAKEITIMAS medukai/', + deleteData.id)  BUTINAI SLASH PRIESH MEDUKUS
      .then(res => {
          console.log(res.data);
  
          setLastUpdate(Date.now());
      })
  
    }, [deleteDataColors]);


//////////////////////////////////////////
/////////////////  USERS  ////////////////

const [users, setUsers] = useState(null)
const [modalDataUsers, setModalDataUsers] = useState(null);
const [editDataUsers, setEditDataUsers] = useState(null);
const [createDataUsers, setCreateDataUsers] = useState(null);


  // READ //

  useEffect(() => {
    
    axios.get('http://localhost:3005/scooter_users')
    .then(res => {
     
        setUsers(res.data)
        // dispachScooters({ payload: res.data})

    })

  }, [lastUpdate]);


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
            scooters,
            colors
        }
    }>
        <ColorContext.Provider value={
          {
            colors,
            setCreateData: setCreateDataColors,
            setDeleteData: setDeleteDataColors
          }
        }>
          {/* <UserContext.Provider value={
            {
              users,
              modalDataUsers,
              setModalDataUsers,
              setEditDataUsers,
              setCreateDataUsers
            }
          }> */}
      <div>
        <div className='header'><b>"Fault" paspirtuku nuoma</b></div>
        <div className='container'>
          <div className='row'>
            <div className='row-col1'>
              <ScootersInfo></ScootersInfo>
              <Create></Create>
              <CreateColor></CreateColor>
              <ColorList></ColorList>
            </div>
            <div className='row-col2'>
              <ScootersSort></ScootersSort>
              <FaultList></FaultList>
            </div>
          </div>
        </div>
      </div>
      <div>
      {modalData && <Edit></Edit>}
      </div>
      {/* </UserContext.Provider> */}
      </ColorContext.Provider>
    </ScootersContext.Provider>
  );
}

export default App;