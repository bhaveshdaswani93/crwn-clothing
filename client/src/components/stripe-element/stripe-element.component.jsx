import React, { useMemo } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from 'axios'

import './stripe-element.styles.scss'

const useOptions = () => {
  const fontSize = '18px';
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const CardForm = (props) => {
  // console.log(amount);
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();
  console.log(props);
  const handleSubmit = async event => {
    
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });


    console.log("[PaymentMethod]", payload);
    if(payload.error) {
      alert('Error: '+payload.error.message)
    } else {
      axios.post('payment',{
        amount:props.total,
        token:payload.paymentMethod
      }).then(success=>alert('payment successful'))
      .catch(e=>{console.log(e);  alert('There was an issue with your payment, Please sure you use the provided credit card.')})
      // alert('Payment Successful.');
    }
  };

  return (
    <div className='stripe-element'>
      <form onSubmit={handleSubmit}>
      <label>
        <span className='card-detail-label'>Card details</span>
        <CardElement
          options={options}
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={event => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
      </label>
      <button type="submit" disabled={!stripe}>
        Pay Now
      </button>
    </form>
    </div>
    
  );
};

export default CardForm;
