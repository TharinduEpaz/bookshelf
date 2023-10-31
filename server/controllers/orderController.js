const orderModel = require("../models/order");
const bookModel = require("../models/book");
const subscriptionOrderModel = require('../models/subscriptionOrder')
const statusCodes = require("http-status-codes");
const CustomError = require("../errors");
const path = require("path");
const { log } = require("console");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

//create order
const addOrder = async (req, res, next) => {
  try {
    const { orderDate, orderStatus, totalPrice } = req.body;
    const buyer_id = req.user.id;

    console.log("Order values:", orderDate, orderStatus, totalPrice, buyer_id);

    const order = await orderModel.create({
      orderDate,
      orderStatus,
      totalPrice,
      buyer_id,
    });

    console.log("Created order:", order);

    res.status(statusCodes.StatusCodes.CREATED).json(order);
  } catch (error) {
    console.error("Error adding order:", error);
    next(error);
  }
};

//get all orders
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.findAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

//count orders
const countOrders = async (req, res, next) => {
  try {
    const orderCount = await orderModel.count();
    res.json(orderCount);
  } catch (err) {
    next(err);
  }
};

//create order
const createOrder = async (req, res, next) => {
  try {
    const { orderDate, orderStatus, totalPrice, buyer_id } = req.body;
    const order = await orderModel.create({
      totalPrice,
      buyer_id,
      orderDate,
    });
    res.status(statusCodes.StatusCodes.CREATED).json(order);
  } catch (err) {
    next(err);
  }
};

// {
// 	id: 'cs_test_b1KD6dwrFckdIhFYCz0trkm9VeAD1uupZk2gEqO8sLjnFnRYuTtE5OrqGH',
// 	object: 'checkout.session',
// 	after_expiration: null,
// 	allow_promotion_codes: null,
// 	amount_subtotal: 570000,
// 	amount_total: 570000,
// 	automatic_tax: { enabled: false, status: null },
// 	billing_address_collection: null,
// 	cancel_url: 'http://localhost:5173/cart',
// 	client_reference_id: null,
// 	client_secret: null,
// 	consent: null,
// 	consent_collection: null,
// 	created: 1698387990,
// 	currency: 'lkr',
// 	currency_conversion: null,
// 	custom_fields: [],
// 	custom_text: {
// 	  shipping_address: null,
// 	  submit: null,
// 	  terms_of_service_acceptance: null
// 	},
// 	customer: null,
// 	customer_creation: 'if_required',
// 	customer_details: {
// 	  address: {
// 		city: '242424',
// 		country: 'LK',
// 		line1: '2424',
// 		line2: '242424',
// 		postal_code: '24242424',
// 		state: null
// 	  },
// 	  email: 'epazi550@gmail.com',
// 	  name: '242',
// 	  phone: '+94753884121',
// 	  tax_exempt: 'none',
// 	  tax_ids: []
// 	},
// 	customer_email: 'epazi550@gmail.com',
// 	expires_at: 1698474390,
// 	invoice: null,
// 	invoice_creation: {
// 	  enabled: false,
// 	  invoice_data: {
// 		account_tax_ids: null,
// 		custom_fields: null,
// 		description: null,
// 		footer: null,
// 		metadata: {},
// 		rendering_options: null
// 	  }
// 	},
// 	livemode: false,
// 	locale: null,
// 	metadata: {},
// 	mode: 'payment',
// 	payment_intent: 'pi_3O5jVLSHOI6b7Ocr0AVC6pvO',
// 	payment_link: null,
// 	payment_method_collection: 'always',
// 	payment_method_configuration_details: null,
// 	payment_method_options: {},
// 	payment_method_types: [ 'card' ],
// 	payment_status: 'paid',
// 	phone_number_collection: { enabled: true },
// 	recovered_from: null,
// 	setup_intent: null,
// 	shipping_address_collection: null,
// 	shipping_cost: {
// 	  amount_subtotal: 0,
// 	  amount_tax: 0,
// 	  amount_total: 0,
// 	  shipping_rate: 'shr_1O5jV4SHOI6b7Ocr8WYunKQy'
// 	},
// 	shipping_details: null,
// 	shipping_options: [
// 	  {
// 		shipping_amount: 0,
// 		shipping_rate: 'shr_1O5jV4SHOI6b7Ocr8WYunKQy'
// 	  }
// 	],
// 	status: 'complete',
// 	submit_type: null,
// 	subscription: null,
// 	success_url: 'http://localhost:5173/paymentsuccess',
// 	total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
// 	ui_mode: 'hosted',
// 	url: null
//   }

//customer object ===>>

// {
// 	id: 'cus_OtYQSPSuLPs7h9',
// 	object: 'customer',
// 	address: null,
// 	balance: 0,
// 	created: 1698394981,
// 	currency: null,
// 	default_source: null,
// 	delinquent: false,
// 	description: null,
// 	discount: null,
// 	email: 'epazingha@gmail.com',
// 	invoice_prefix: '09889DF1',
// 	invoice_settings: {
// 	  custom_fields: null,
// 	  default_payment_method: null,
// 	  footer: null,
// 	  rendering_options: null
// 	},
// 	livemode: false,
// 	metadata: {
// 	  cartItems: '[{"id":"1f3de2a5-6b8c-4a1e-88a9-dfc71e6c49c1","title":"Rich Dad Poor Dad","price":2800,"image":"http://localhost:3000/uploads/rich-dad-poor-dad-1.jpg","stock":75,"amount":1},{"id":"aa0bf31a-1a1a-4a93-b22e-2a76c75da8d9","title":"Madol Duwa","price":2900,"image":"http://localhost:3000/uploads/madol.jpeg","stock":75,"amount":1}]',
// 	  userId: '966f1f28-9b84-496d-81be-8ca6729f3b3d'
// 	},
// 	name: null,
// 	next_invoice_sequence: 1,
// 	phone: '+94753884121',
// 	preferred_locales: [],
// 	shipping: null,
// 	tax_exempt: 'none',
// 	test_clock: null
//   }

const create_order_by_webhook_data = async (data) => {
  //action that should be done in the create order function
  // 1. add the order to the order table
  // 2. decrease the stock from the books table
  // console.log(customer);

  try {
    const currentDate = new Date();
    const deliveryDate = new Date(currentDate);
    deliveryDate.setDate(currentDate.getDate() + 5);
    const customer = await stripe.customers.retrieve(data.customer);

    if (customer.metadata.subscription == 1) {
      const subscriptionOrder = await subscriptionOrderModel.create({
      orderDate: deliveryDate,
      orderStatus: "pending",
      totalPrice: data.amount_subtotal / 100,
      user_id: customer.metadata.userId,
      isPaid: true,
      orderItems: JSON.parse(customer.metadata.cartItems),
      address: data.customer_details.address,
      phone: data.customer_details.phone,

      }
      )
    }
    else{
      const order = await orderModel.create({
        orderDate: deliveryDate,
        orderStatus: "pending",
        totalPrice: data.amount_subtotal / 100,
        user_id: customer.metadata.userId,
        isPaid: true,
        orderItems: JSON.parse(customer.metadata.cartItems),
        address: data.customer_details.address,
        phone: data.customer_details.phone,
      });

    }


 

    // await reduceStock(customer.metadata.cartItems);
  } catch (error) {
    console.log(error);
  }

  // console.log(data);
};

const reduceStock = async (cartItems) => {
  const items = JSON.parse(cartItems);

  console.log(items);

  items.forEach(async (item) => {
    await bookModel.update(
      { stock: item.stock - item.amount },
      {
        where: {
          id: item.id,
        },
      }
    );
  });
};

const get_orders_by_user = async (req,res,next) => {
  const id = req.user.userId;
  try {
    const orders = await orderModel.findAll({
      where:{
        user_id:id
      }
    })
    res.json(orders)
  } catch (error) {
    next(error);
  }
}
const get_subscription_orders_by_user = async (req,res,next) => {
  const id = req.user.userId;
  try {
    const orders = await subscriptionOrderModel.findAll({
      where:{
        user_id:id
      }
    })
    res.json(orders)
  } catch (error) {
    next(error);
  }
}

module.exports = {
  addOrder,
  getAllOrders,
  countOrders,
  createOrder,
  create_order_by_webhook_data,
  get_orders_by_user,
  get_subscription_orders_by_user,

};
