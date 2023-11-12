import './scss/main.scss';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate, Outlet } from 'react-router-dom';

import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Button, Nav, Tab } from 'react-bootstrap';





const App = () => {

  const { isLoggedIn, logout, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <header className="main-header">
        <nav>
          <ul>
            <li><Link to="/">Заявки</Link></li>
            <li><Link to="/employees">Сотрудники</Link></li>
          </ul>
        </nav>

        <Button variant="danger" onClick={logout}>Выйти</Button>
      </header>

      <main>
        <Outlet />
      </main>
    </>);
}

export default App;
