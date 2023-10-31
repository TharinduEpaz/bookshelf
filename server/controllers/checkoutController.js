require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const checkout = async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}`,
  });
  res.redirect(303, session.url);
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
    createPayment
}


