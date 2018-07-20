import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import DetailsFolderNav from "./details_nav/details_nav_component";
import DetailsOverview from "./details_overview/details_overview_component";
import Preperation from "./details_preperation/preperation_component";
import Ingredients from "./details_ingredients/ingredients_component";
export default class DetailsFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabSelected: 0,
      areNutritionalFactsVisible: false
    };
    this.selectTab = this.selectTab.bind(this);
    this.displayTab = this.displayTab.bind(this);
  }

  render() {
    const { tabSelected } = this.state;
    const { product } = this.props;
    console.log("product", product);
    return (
      <View style={[styles.body, this.props.style]}>
        <DetailsFolderNav activeIndex={tabSelected} onSelect={this.selectTab} />
        <View style={styles.container}>
          {this.displayTab(tabSelected, product)}
        </View>
      </View>
    );
  }
  selectTab(index) {
    this.setState({ tabSelected: index });
  }
  displayTab(index, product) {
    switch (index) {
      case 0:
        {
          const pairings = [];

          if (product.metafields["beer_pairings"])
            pairings.push(product.metafields["beer_pairings"]);
          if (product.metafields["wine_pairings"])
            pairings.push(product.metafields["wine_pairings"]);
          return (
            <DetailsOverview
              description={product.metafields.description_tag.value}
              pairings={pairings}
            />
          );
        }
        break;
      case 1:
        {
          return <Preperation {...product.metafields} />;
        }
        break;
      default:
        return (
          <Ingredients
            {...product.metafields}
            toggleNutritionalFacts={this.props.toggleNutritionalFacts}
          />
        );
    }
  }
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%"
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 10
  }
});
