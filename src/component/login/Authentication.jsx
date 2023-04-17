import { useState, useEffect } from 'react';
import { firebaseConfig } from './firebaseConfig';
import { getToken, removeToken } from './localStorage';

const Auth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    fetch(`${firebaseConfig.databaseURL}/accounts:signOut?key=${firebaseConfig.apiKey}`);
  };

  if (isLoggedIn) {
    return (
      <button onClick={handleLogout}>Вийти из аккаунту</button>
    );
  }

  if (!isLoggedIn) {
    return (
      <button onClick={handleLogout}>Вийти з акаунту</button>
    );
  }

  return (
    <>
      <button>Увійти в аккаунт</button>
    </>
  );
};

export default Auth;
