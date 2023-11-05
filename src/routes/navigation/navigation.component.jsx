import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { CartContext } from '../../contexts/cart.context';
import { selectCurrentUser } from '../../store/user/user.selector';

import { ReactComponent as KRMLogo  } from '../../assets/bird_2.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {NavigationContainer, NavLinks, Navlink, LogoContainer} from './navigation.styles';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const {isCartOpen} = useContext(CartContext);
 
    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <KRMLogo className='logo'/>
          </LogoContainer>   
          
          <NavLinks>
            <Navlink to='/shop'>
                SHOP
            </Navlink>
            {currentUser ? (
                <Navlink as='span' onClick={signOutUser}>SIGN OUT</Navlink>
                ) : ( <Navlink to='/auth'>
                        SIGN IN
                      </Navlink>
                    )}
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  };
  
  export default Navigation;