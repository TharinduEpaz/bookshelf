require("dotenv").config();
const YOUR_DOMAIN = 'http://localhost:5173';
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;


const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const checkout = async (req, res,next) => {

  const email = req.body.user.email;
  const userId = (req.body.user);
  const totalPrice = req.body.total;
  const subscription = req.body.subscription || 0;
  console.log(totalPrice);
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
      subscription: subscription,
    }
  })
  
  let line_items;

  if (subscription){
    line_items = req.body.cart.map((item)=>{
      return{
        price_data: {
          currency: 'lkr',
          product_data: {
            name: item.title,
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      }
    })
  }
  else{
    line_items = req.body.cart.map((item)=>{
      return{
        price_data: {
          currency: 'lkr',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.amount ,
      }
    })
  

  }

  
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

const extendDate = async (req, res, next) => {
	const amount = req.body.amount;
  console.log(amount)
	const extension = req.body.extension;
  console.log(extension);
  const userId = req.user.userId;

	try {
    const customer = await stripe.customers.create({
      metadata:{
        userId: userId,
        extension: extension,
      }
    })

    const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "payment",
		client_reference_id: "extention 1", // You can use this to store metadata
		line_items: [
			{
				price_data: {
					currency: "lkr",
					product_data: {
						name: "Total Amount", // You can name this as you like
					},
					unit_amount: amount*100, // The total amount in cents (e.g., $10.99)
				},
				quantity: 1, // Set quantity to 1 for the total amount
			},
      
		],
    customer:customer.id,

		// Other parameters as needed
		success_url: "http://localhost:5173/paymentsuccess",
		cancel_url: "http://localhost:5173/cart",
	});


     res.send({ url: session.url });

	} catch (error) {
		next(error);
	}
};


module.exports = {
    checkout,
    config,
    createPayment,
    extendDate
}


