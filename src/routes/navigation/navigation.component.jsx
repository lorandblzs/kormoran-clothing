import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCartOpen } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { ReactComponent as KRMLogo  } from '../../assets/bird_2.svg';
import { signOutStart } from '../../store/user/user.action';

import {NavigationContainer, NavLinks, Navlink, LogoContainer} from './navigation.styles';

const Navigation = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectCartOpen);

  const signOutUser = () => dispatch(signOutStart());
 
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