import { Fragment, useContext } from 'react';
import {Outlet, Link} from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as KRMLogo  } from '../../assets/bird_2.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';

import {NavigationContainer, NavLinks, Navlink, LogoContainer} from './navigation.styles';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  const signOuthandler = async () => { 
    await signOutUser();
    setCurrentUser(null);
   };
 
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
            {
              currentUser ? (
                <Navlink as='span' onClick={signOuthandler}>SIGN OUT</Navlink>
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