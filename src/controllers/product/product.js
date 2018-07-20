import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import ProductRetail from "/components/views/product_retail.js";
import Product from "/components/views/product.js";
export default class ProductController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleNutritionalFacts = this.toggleNutritionalFacts.bind(this);
  }

  componentWillMount() {
    const { product, type } = this.props.navigation.state.params;
    this.setState({ product, type });
  }

  render() {
    const { product, type } = this.state;
    const { goBack } = this.props.navigation;
    // if (type === "online") {
    //   return <Product product={product} goBack={goBack} />;
    // } else if (type === "retail") {
    //   return <ProductRetail product={product} goBack={goBack} />;
    // } else {
    //   return <Text>Loading</Text>;
    // }
    switch (type) {
      case "online":
        return (
          <Product
            product={product}
            goBack={goBack}
            toggleNutritionalFacts={this.toggleNutritionalFacts}
          />
        );
        break;
      case "retail":
        return <ProductRetail product={product} goBack={goBack} />;
        break;
      default:
        return <Text>Loading</Text>;
    }
  }
  async toggleNutritionalFacts() {
    const {
      nutritional_image_url: { value: url }
    } = this.state.product.metafields;

    this.props.navigation.navigate({
      routeName: "NutritionalFacts",
      params: {
        nutritional_image_url: url
      }
    });
  }
}
const styles = StyleSheet.create({});
