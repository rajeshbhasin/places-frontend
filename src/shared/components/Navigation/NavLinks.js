import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';

function NavLinks(props) {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = () => {
    auth.logout();
    history.push('/');
  };

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL USERS
        </NavLink>
      </li>
      <li>
        {auth.isLoggedIn && (
          <NavLink to={`/${auth.userId}/places`} exact>
            MY PLACES
          </NavLink>
        )}
      </li>
      <li>
        {auth.isLoggedIn && (
          <NavLink to="/places/new" exact>
            ADD PLACE
          </NavLink>
        )}
      </li>
      <li>
        {!auth.isLoggedIn && (
          <NavLink to="/auth" exact>
            AUTHENTICATE
          </NavLink>
        )}
      </li>
      <li>
        {auth.isLoggedIn && <button onClick={logoutHandler}>LOG OUT</button>}
      </li>
    </ul>
  );
}

export default NavLinks;
