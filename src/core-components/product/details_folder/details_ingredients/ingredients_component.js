import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import { ChefdButton } from "/core-components/index";
import SeeMore from "/core-components/seemore/seemore_component.js";
import FontAwesome, { Icons } from "react-native-fontawesome";
export default class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allergensTruncated: false,
      allergensOpen: false,
      ingredientsTruncated: false,
      ingredientsOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.setTruncated = this.setTruncated.bind(this);
  }

  render() {
    const {
      customer_ingredient_list,
      allergens,
      toggleNutritionalFacts
    } = this.props;
    const {
      allergensTruncated,
      allergensOpen,
      ingredientsTruncated,
      ingredientsOpen
    } = this.state;

    return (
      <View style={styles.body}>
        <Text style={styles.heading}>From The Pantry</Text>
        {!allergensOpen && (
          <View style={styles.infoContainer}>
            <View style={styles.requirementContainer}>
              <Text style={styles.requirementSubtitle}>Ingredients</Text>
              <SeeMore
                id="ingredients"
                maxHeight={50}
                lines={2}
                toggleCallback={this.toggle}
                setTruncated={this.setTruncated}
                isOpen={ingredientsOpen}
              >
                <Text style={styles.requirementText}>
                  {customer_ingredient_list.value.replace(/\s*,\s*/g, ", ")}
                </Text>
              </SeeMore>
              {ingredientsTruncated && (
                <TouchableOpacity
                  style={styles.toggleIcon}
                  onPress={() => this.toggle("ingredients")}
                >
                  {this.getIcon(ingredientsOpen)}
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {!ingredientsOpen && (
          <View style={styles.infoContainer}>
            <View style={styles.requirementContainer}>
              <Text style={styles.requirementSubtitle}>Allergens</Text>
              <SeeMore
                text={allergens.value}
                label="Allergens"
                id="allergens"
                lines={2}
                maxHeight={50}
                setTruncated={this.setTruncated}
                isOpen={allergensOpen}
              >
                <Text style={styles.requirementText}>
                  {allergens.value.replace(/\s*,\s*/g, ", ")}
                </Text>
              </SeeMore>
              {allergensTruncated && (
                <TouchableOpacity
                  style={styles.toggleIcon}
                  onPress={() => this.toggle("allergens")}
                >
                  {this.getIcon(allergensOpen)}
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {!ingredientsOpen &&
          !allergensOpen && (
            <ChefdButton
              outlined
              buttonText={"See Nutrition Facts"}
              style={styles.nutritionButton}
              onPress={toggleNutritionalFacts}
            />
          )}
      </View>
    );
  }
  toggle(id) {
    console.log(id, "hiii");
    const { allergensOpen, ingredientsOpen } = this.state;
    switch (id) {
      case "allergens":
        this.setState({ allergensOpen: !allergensOpen });
        break;
      case "ingredients":
        this.setState({ ingredientsOpen: !ingredientsOpen });
    }
  }

  getIcon(isOpen) {
    const iconType = isOpen ? "chevronUp" : "chevronDown";
    return <FontAwesome>{Icons[iconType]}</FontAwesome>;
  }
  setTruncated(id) {
    switch (id) {
      case "ingredients":
        this.setState({ ingredientsTruncated: true });
        break;
      case "allergens":
        this.setState({ allergensTruncated: true });
        break;
      default:
    }
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  heading: {
    ...typography.productSmall,
    paddingBottom: 5
  },
  recipeDetailTextContainer: {
    display: "flex"
  },
  recipeDeailName: {
    ...typography.constants,
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGray
  },
  recipeDetailValue: {
    ...typography.productSmall,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 27,
    color: colors.orange
  },
  kitchenRequirementsContainer: {
    display: "flex",
    flexDirection: "column"
  },
  nutritionFactsLink: {
    ...typography.link
  },
  nutritionButton: {
    marginTop: 10
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    marginVertical: 10
  },
  requirementSubtitle: {
    ...typography.productSubtitle,
    width: 120
  },
  requirementContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  toggleIcon: {
    padding: 10
  },
  requirementText: {
    ...typography.constants,
    fontSize: 12,
    flex: 1
  }
});
