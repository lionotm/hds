import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import './Navbar.css';

function Navbar({ signOut, userId, userName }) {
  const [click, setClick] = useState(false);
  const [button2, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const adminId = "a2cda53a-aa2b-49b0-a442-4e1bd7668150"

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            HDS
            <i class='fas fa-th' />
          </Link>

          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className='nav-item'>
              <Link to='/bookings' className='nav-links' onClick={closeMobileMenu}>
                Bookings
              </Link>
            </li>
            {userId === adminId &&
              <li className='nav-item'>
                <Link to='/admin' className='nav-links' onClick={closeMobileMenu}>
                  Admin
              </Link>
              </li>
            }
            {
              userId &&
              <li>
                <Link className='nav-links-mobile' onClick={() => { closeMobileMenu(); signOut(); }}>
                  Sign Out
              </Link>
              </li>
            }
            <li>
              <Link Link to='/sign-in' className='nav-links-mobile' onClick={closeMobileMenu} >
                Sign In
              </Link>
            </li>

          </ul>
          {button2 && <Button buttonStyle='btn--outline'>Sign In</Button>}
          {button2 && <Button buttonStyle='btn--outline' onClick={signOut}>Sign out</Button>}
        </div>
      </nav >
    </>
  );
}

export default Navbar;