import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'

import './header.styles.scss'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropDown from '../cart-dropdown/cart-dropdown.component'
import { selectHidden } from '../../redux/cart/cart.selector'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { HeaderContainer,LogoContainer,OptionsContaner,OptionLink,OptionDiv } from './header.styles'


const Header = ({currentUser,hidden}) => (
    <HeaderContainer >
        
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContaner>
            <OptionLink className="option" to='/shop'> 
                SHOP
            </OptionLink>
            <OptionLink className="option" to='/shop'> 
                CONTACT
            </OptionLink>
        {
            currentUser ? 
            <OptionLink as='div' className='option' onClick={()=>auth.signOut()}>
                SIGN OUT
            </OptionLink> 
            :
            <OptionLink className='option' to='/sign-in'>
                SIGN IN
            </OptionLink>
        }
        <CartIcon />
        </OptionsContaner>
        {
            hidden ?null:
            <CartDropDown />
        }

    </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectHidden
});

export default connect(mapStateToProps)(Header);