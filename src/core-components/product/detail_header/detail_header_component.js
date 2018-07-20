import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import { ChefdButton } from "/core-components/index";
import AmountToggle from "./amount_toggle";
export default class ProductOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.changePrice = this.changePrice.bind(this);
  }
  componentWillMount() {
    const { variants } = this.props;
    const formattedVariants = this.setVariants(variants);
    const keys = Object.keys(formattedVariants);
    const selected = keys.length > 0 && parseInt(keys[0], 10);
    this.setState({
      variants: formattedVariants,
      selected
    });
  }
  // getBuyButtons = variants =>
  //   variants.map(({ price, title }, selectedIndex) => (
  //     <ChefdButton
  //       isPriceButton
  //       price={11.0}
  //       servings={2}
  //       key={selectedIndex}
  //       style={styles.buyButton}
  //     />
  //   ));

  render() {
    const { title, metafields: { recipe_subtitle } } = this.props;
    const {
      price,
      selectedQuantity,
      variants,
      selectedIndex,
      selected
    } = this.state;
    return (
      <View style={styles.productOverviewContainer}>
        <View style={styles.overviewComponents}>
          <Text style={[styles.title]}>{title}</Text>
          {recipe_subtitle && (
            <Text
              style={[typography.productSubtitle, styles.subtitle]}
              numberOfLines={2}
            >
              {recipe_subtitle.value}
            </Text>
          )}
        </View>
        <View style={[styles.overviewComponents, styles.buyContainer]}>
          {variants &&
            Object.keys(variants).length > 0 && (
              <View style={styles.priceQuantityContainer}>
                <Text style={styles.priceText}>{variants[selected].price}</Text>

                <AmountToggle
                  onChange={this.changePrice}
                  variants={variants}
                  selected={selected}
                />
              </View>
            )}
          <ChefdButton buttonText={"Add To Cart"} />
        </View>
      </View>
    );
  }
  setVariants(variants) {
    const output = {};
    variants.forEach(variant => {
      const serving = parseInt(variant.title.split(" ")[0], 10);
      const priceNum =
        variant.price % 1 != 0 ? variant.price : Math.floor(variant.price);
      const price = `$${priceNum}`;
      output[serving] = {
        serving,
        price
      };
    });

    return output;
  }
  changePrice(amount) {
    this.setState({ selected: amount });
  }
}

const styles = StyleSheet.create({
  productOverviewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  overviewComponents: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: "50%"
  },
  title: {
    ...typography.productSmall,
    textAlign: "left"
  },
  subtitle: {
    fontSize: 14,
    textAlign: "left"
  },
  buyContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  priceQuantityContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",

    marginBottom: 10
  },
  priceText: {
    color: colors.charchoal,
    fontFamily: "verlag-bold",
    fontSize: 40,
    marginRight: 10
  },
  buyButton: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center"
  }
});

ProductOverview.propTypes = {
  title: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired
};
