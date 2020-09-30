import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import Success from './Success';
import * as serviceWorker from './serviceWorker';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CartProvider } from 'use-shopping-cart';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

ReactDOM.render(
  <Elements stripe={stripePromise}>
    <CartProvider mode="checkout-session" stripe={stripePromise} currency="USD">
      <Router>
        <header>
          <Link to="/">Shopping Cart & Payments</Link>
        </header>

        <Switch>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>

      // Footer
      <footer class="py-5 bg-dark">
        <div class="container">
          <p class="m-0 text-center text-white">Copyright &copy; https://leeleesunicorns.com 2020</p>
        </div>
        <!-- /.container -->
      </footer>
    </CartProvider>
  </Elements>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
