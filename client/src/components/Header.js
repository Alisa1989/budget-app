import React from "react";
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { LuBird } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/AuthSlice'

import "../App.css";

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className="App-header">
      <h1>
        <Link to="/">
            <LuBird/>
            Budgee
        </Link>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
      </h1>
        {/* <ul className="Nav-list">
          {user ? (
            <li>
            <button className="btn-logout" onClick={onLogout}>
                <FaSignOutAlt />Log Out
            </button>
        </li>
          ) : (
            <>
            <li>
                <Link className="Nav-link" to="/login">
                    <FaSignInAlt />Log In
                </Link>
            </li>
            <li>
                <Link className="Nav-link" to="/register">
                    <FaUser />Register
                </Link>
            </li>
            </>
          )}
            
        </ul> */}
    </header>
  );
}

export default Header;
