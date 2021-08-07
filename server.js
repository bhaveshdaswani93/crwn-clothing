const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

if(process.env.NODE_ENV !== 'production') require('dotenv').config();
// console.log(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express();

const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors())

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname,'client/build')));

    app.get('*',function(req,res){
        res.sendFile(path.join(__dirname,'client/build','index.html'))
    });
}

app.post('/payment', function(req,res){
        console.log(req.body)
        const body = {
            amount: req.body.amount*100,
            payment_method: req.body.token.id,
            currency:'inr',
            confirm:true,
            payment_method_types: ['card'],
            description:"Test Payment"
        }
        // console.log(body);
        stripe.paymentIntents.create(body)
        .then(stripeRes => {
            res.status(200).send({success:stripeRes});
        })
        .catch(e=>res.status(400).send({error:e})) 
        
   
        
    
    

});

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('app is running on port '+port);
})
