// Create Stripe checkout session and return session ID

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});

const validateCartItems = require('use-shopping-cart/src/serverUtil').validateCartItems;

// products load from json file or can be an inventory management service, database query,
// or some other API call

const inventory = require('./data/products.json');

exports.handler = async (event) => {
  try {
    const cartItems = JSON.parse(event.body);

    const line_items = validateCartItems(inventory, cartItems);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['US'],
      },

      // env var set by Netlify and inserts live site URL
      // Netlify info for env variables: https://docs.netlify.com/configure-builds/environment-variables/

      success_url: `${process.env.URL}/success`,
      cancel_url: process.env.URL,
      line_items: [
        ...line_items,
        {
          name: 'Shipping fee',
          description: 'Handling and shipping fee for delivery',
          quantity: 1,
          amount: 500,
          currency: 'USD',
        },
      ],

      // We are using the metadata to track which items were purchased.
      // We can access this meatadata in our webhook handler to then handle
      // the fulfillment process.
      // In a real application you would track this in an order object in your database.

      payment_intent_data: {
        metadata: {
          items: JSON.stringify(
            Object.keys(cartItems).map((sku) => ({
              sku,
              quantity: cartItems[sku].quantity,
            }))
          ),
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionID: session.id }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify(error),
    };
  }
};
