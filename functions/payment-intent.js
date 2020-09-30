const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-03-02',
  maxNetworkRetries: 2,
});

const validateCartItems = require('use-shopping-cart/src/serverUtil').validateCartItems;
const inventory = require('./data/products.json');

exports.handler = async (event) => {
  try {
    const { cartDetails: cartItems, paymentDetails } = JSON.parse(event.body);
    const line_items = validateCartItems(inventory, cartItems);
    const amount = line_items.reduce(
      (sum, { amount, quantity }) => sum + amount * quantity,
      500 // shipping fee
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      ...paymentDetails,

      metadata: {
        items: JSON.stringify(
          Object.keys(cartItems).map((sku) => ({
            sku,
            quantity: cartItems[sku].quantity,
          }))
        ),
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
