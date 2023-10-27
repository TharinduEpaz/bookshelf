require("dotenv").config();
const YOUR_DOMAIN = 'http://localhost:5173';
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const checkout = async (req, res,next) => {

  const email = req.body.user.email;
  const userId = (req.body.user);
  console.log(userId);

  let shipping = req.body.cart.length * 200 * 100;
  let total = 0;

  req.body.cart.map((item)=>{
    total += item.price * item.amount * 100
  })

  if(total > 500000){
    shipping = 0;
  }

  const customer = await stripe.customers.create({
    metadata:{
      userId: userId,
      email: email,
      cartItems: JSON.stringify(req.body.cart),
    }
  })

  const line_items = req.body.cart.map((item)=>{
    return{
      price_data: {
        currency: 'lkr',
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.amount,
    }
  })

  try{
  const session = await stripe.checkout.sessions.create({
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: shipping,
            currency: 'lkr',
          },
          display_name: 'shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      
    ],
    line_items: line_items,
    mode: 'payment',
    success_url: 'http://localhost:5173/paymentsuccess',
    cancel_url: 'http://localhost:5173/cart',
    customer:customer.id,
    phone_number_collection:{
      enabled:true
    },
  });


  res.send({url:session.url})
}
catch(error){
  next(error)
}

};

const config = async (req, res, next) => {
  
    res.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });

  }

const createPayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "LKR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    next(e)
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
}



module.exports = {
    checkout,
    config,
    createPayment,
}


