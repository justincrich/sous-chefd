import React from "react";
import { StackNavigator } from "react-navigation";

//Pages
import Home from "/controllers/home/home.js";
import Results from "/controllers/results/results";
import Product from "/controllers/product/product";
import NutritionalFacts from "/components/views/nutritional_facts";
//Views
const Navs = StackNavigator(
  {
    Home: {
      screen: Home
    },
    Results: {
      screen: Results
    },
    Product: {
      screen: Product
    },
    NutritionalFacts: {
      screen: NutritionalFacts
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default Navs;
