
import axios from 'axios';
import { useState, useEffect, useReducer } from 'react';
import './App.scss';
import sortReducer from './Reducer/sort';

function App() {

  const [scoo, setScoo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/scooters')
    .then(res => {
      setScoo(res.data)
    })
  }, [scoo])

  const [sort, setSort] = useState('ID')
  const [scooters, dispachScooters] = useReducer(sortReducer, scoo)


  useEffect(() => {
    axios.get('http://localhost:3003/scooters')
    .then(res => {

      dispachScooters({type: sort, payload: res.data})
    })
  })


  return (
    <div>
      <h1>FAULT-DB</h1>
      <select value={sort} onChange={e => setSort(e.target.value)}>
        <option value="ID">ID</option>
        <option value="KM">KM</option>
        <option value="Date">Date</option>
      </select>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div>
          {
            sort === 'ID' ?         
                [...scoo].sort((a, b) => (a.id - b.id)).map(a => <ul key={a.id}><b>ID: {a.id}</b>
                <li>Registration Code: <b>{a.reg_code}</b></li>
                <li>State: <b>{a.state}</b></li>
                <li>Km: <b>{a.km}</b> km</li>
                <li>Last Time Used: <b>{a.date.slice(0, 10)}</b></li>
                <li>State: <b>{a.busy === 1 ? 'Busy' : 'Free'}</b></li>
              </ul>)
              : null
          }
                  {
            sort === 'KM' ?         
                [...scoo].sort((a, b) => (a.km - b.km)).map(a => <ul key={a.id}><b>ID: {a.id}</b>
                <li>Registration Code: <b>{a.reg_code}</b></li>
                <li>State: <b>{a.state}</b></li>
                <li>Km: <b>{a.km}</b> km</li>
                <li>Last Time Used: <b>{a.date.slice(0, 10)}</b></li>
                <li>State: <b>{a.busy === 1 ? 'Busy' : 'Free'}</b></li>
              </ul>)
              : null
          }
          {
            sort === 'Date' ?         
                [...scoo].sort((a, b) => a.date.slice(0, 10).localeCompare(b.date.slice(0, 10))).map(a => <ul key={a.id}><b>ID: {a.id}</b>
                <li>Registration Code: <b>{a.reg_code}</b></li>
                <li>State: <b>{a.state}</b></li>
                <li>Km: <b>{a.km}</b> km</li>
                <li>Last Time Used: <b>{a.date.slice(0, 10)}</b></li>
                <li>State: <b>{a.busy === 1 ? 'Busy' : 'Free'}</b></li>
              </ul>)
              : null
          }
        </div>
        <div>
        {
                scooters.map(a => (
                <ul key={a.id}><b>ID: {a.id}</b>
                  <li>Registration Code: <b>{a.reg_code}</b></li>
                  <li>State: <b>{a.state}</b></li>
                  <li>Km: <b>{a.km}</b> km</li>
                  <li>Last Time Used: <b>{a.date.slice(0, 10)}</b></li>
                  <li>State: <b>{a.busy === 1 ? 'Busy' : 'Free'}</b></li>
                </ul>))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
