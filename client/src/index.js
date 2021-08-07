import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import AddProduct from './components/AddProduct';
import MyAccountPage from './pages/MyAccountPage';
import EditProfilePage from './pages/EditProfilePage';
import './styles/variables.css';
import './styles/normalize.css';
import ProductDetailPage from './pages/ProductDetailPage';
import Products from './pages/ProductsPage';
import InfoPage from './pages/InfoPage';
import ContactUsPage from './pages/ContactUsPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { AuthContextProvider } from './context/AuthContext';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Checkout from './pages/Checkout';
import UpdateProduct from './components/UpdateProduct';

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('root');
  if (el) {
    render(
      <AuthContextProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/info" component={InfoPage} />
            <Route exact path="/ContactUsPage" component={ContactUsPage} />
            <Route exact path="/signin" component={SignInPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route path="/account" exact component={MyAccountPage} />
            <Route path="/edit-profile" exact component={EditProfilePage} />
            <Route path="/products/add" exact component={AddProduct} />
            <Route path="/:id" exact component={ProductDetailPage} />
            <Route path="/products/:keyword" exact component={Products} />
            <Route path="/orders/checkout" exact component={Checkout} />
            <Route path="/update/:id" exact component={UpdateProduct} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      </AuthContextProvider>,

      el,
    );
  }
  console.log('app loaded!!!');
});
