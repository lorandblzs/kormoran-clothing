import { Fragment, useContext } from 'react';
import {Outlet, Link} from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as KRMLogo  } from '../../assets/bird_2.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  const signOuthandler = async () => { 
    await signOutUser();
    setCurrentUser(null);
   };
 
    return (
      <Fragment>
        <div className='navigation'>
          <Link className='logo-container' to='/'>
            <KRMLogo className='logo'/>
          </Link>   
          
          <div className='nav-links-container' >
            <Link className='nav-link' to='/shop'>
                SHOP
            </Link>
            {
              currentUser ? (
                <span className='nav-link' onClick={signOuthandler}>SIGN OUT</span>
                ) : ( <Link className='nav-link' to='/auth'>
                        SIGN IN
                      </Link>
                    )}
            <CartIcon />
          </div>
          {isCartOpen && <CartDropdown />}
        </div>
        <Outlet />
      </Fragment>
    );
  };
  
  export default Navigation;