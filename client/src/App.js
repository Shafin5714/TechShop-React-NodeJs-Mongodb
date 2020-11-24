import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router , Route} from "react-router-dom";
import CartScreen from "./screens/CartScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
           
           <Route path="/login" component={LoginScreen}  exact/>
           <Route path="/register" component={RegisterScreen}  exact/>
           <Route path="/profile" component={ProfileScreen}  exact/>
           <Route path="/product/:id" component={ProductScreen}/>
           <Route path="/cart/:id?" component={CartScreen}/> 
           <Route path="/" component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );
};

export default App;
