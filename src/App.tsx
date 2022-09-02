import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Response from './components/Response';
import Emoji from './components/Emoji';
import CelebrityComparison from './components/CelebrityComparison';
import FullPage from './components/FullPage';
import FullPageExample from './components/FullPageExample';
import Upload from './components/Upload';
import { Routes, Route } from 'react-router-dom';
import WordCloud from './components/WordCloud';
import Statistics from './components/Statistics';
import { useNavigate, useLocation } from 'react-router-dom';
import Emotions from './components/Emotions';
import axios from 'axios';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userExample, setUserExample] = useState<User | null>(null);
  const [navColor, setNavColor] = useState<string>('#aecefe00');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log('user is null');
    if (user === null) {
      navigate('/example');
    }
  }, [user]);

  useEffect(() => {
    if (location.pathname === '/') {
      setNavColor('#aecefe00');
      navigate('/example');
    } else {
      setNavColor('#aecefe00');
    }
  }, [location]);


  const logOut = () => {
    setUser(null);
    navigate('/login', { replace: true });
  };


  useEffect(() => {
    if (userExample === null) {
      axios
      .post(
        "/example", 
        { userID: '631017bf3f01c43bccaadb3d' },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const userEx: User = response.data as User;
        setUserExample(userEx);
      })
    }
  }, [userExample]);

  return (
    <div>
      <Navbar backgroundColor={navColor} user={user} logOut={logOut}></Navbar>
      <Routes>
      <Route
          path="example"
          element={<FullPageExample></FullPageExample>}
        />
        <Route
          path="upload"
          element={<Upload user={user} setUser={setUser} />}
        />
        <Route path="login" element={<Login setUser={setUser} />} />
        <Route
          path="wrapped"
          element={<FullPage user={user as User}></FullPage>}
        />
      </Routes>
    </div>
  );
}

export default App;
