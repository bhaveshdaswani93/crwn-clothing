import React from 'react'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import './checkout.styles.scss'
import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import {selectCartItems,selectCartItemsTotal} from  '../../redux/cart/cart.selector'
import CheckoutForm from '../../components/stripe-element/stripe-element.component'

const CheckoutPage = ({cartItems,total})=>(
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(cartItem=><CheckoutItem cartItem={cartItem} key={cartItem.id} />)}
        <div className='total'>
            <span>${total}</span>
        </div>
        <div className='test-warning'>
            *Please use following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 12/25 - CVV: 123 - ZIP: 12345
        </div>

        <CheckoutForm total={total} />

    </div>
)

const mapStateToProps = createStructuredSelector({
    cartItems:selectCartItems,
    total:selectCartItemsTotal
})

export default connect(mapStateToProps)(CheckoutPage)