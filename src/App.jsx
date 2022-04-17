import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { Routes , Route } from 'react-router-dom';
import './App.css';
import CreateJob from './create-job/CreateJob';
import { auth } from './firebase-config';
import Home from './Homepage/Home';
import Login from './login/Login';

function App() {
  const [isAuth , SetIsAuth] = useState(false);
  const [userData, SetUserData] = useState([]);

  onAuthStateChanged(auth, (currentUser)=>{
    SetUserData(currentUser);
    SetIsAuth(true);
  })

  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Login SetUserData={SetUserData} SetIsAuth={SetIsAuth}  />}/>
          <Route path='/home' element={!isAuth ? <Login /> : <Home UserData={userData} SetIsAuth={SetIsAuth} />} />
          <Route path='/post-job' element={!isAuth ? <Login /> : <CreateJob userData={userData} />} />
        </Routes>
    </div>
  );
}

export default App;
