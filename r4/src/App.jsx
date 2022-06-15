
import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.scss';

function App() {

  const [scoo, setScoo] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/scooters')
    .then(res => {
      setScoo(res.data)
    })
  })


  return (
    <div>
      <h1>FAULT-DB</h1>
      <div>
        {
          scoo.map(a => <ul key={a.id}><b>ID: {a.id}</b>
            <li>Registration Code: <b>{a.reg_code}</b></li>
            <li>State: <b>{a.state}</b></li>
            <li>Km: <b>{a.km}</b> km</li>
            <li>Last Time Used: <b>{a.date.slice(0, 10)}</b></li>
            <li>State: <b>{a.busy === 1 ? 'Busy' : 'Free'}</b></li>
          </ul>)
        }
      </div>

    </div>
  );
}

export default App;
