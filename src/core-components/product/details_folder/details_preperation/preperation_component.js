import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import SeeMore from "/core-components/seemore/seemore_component";
//<Text>{equipment.value.replace(/\s*,\s*/g, ", ")}</Text>
import FontAwesome, { Icons } from "react-native-fontawesome";
export default class Preperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      equipmentTruncated: false,
      extraIngredientsTruncated: false,
      equipmentOpened: false,
      extraIngredientsOpened: false
    };
    this.getRecipeOverview = this.getRecipeOverview.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setTruncated = this.setTruncated.bind(this);
  }
  render() {
    return <View>{this.getRecipeOverview(this.props)}</View>;
  }

  getRecipeOverview({
    skill_level,
    spice_level,
    cooking_time,
    time_units,
    extra_ingredients_needed,
    equipment
  }) {
    const {
      isOpen,
      equipmentTruncated,
      equipmentOpened,
      extraIngredientsTruncated,
      extraIngredientsOpened
    } = this.state;
    return (
      <View style={[styles.body, this.props.style]}>
        <Text style={styles.heading}>Preperation Overview</Text>
        <View style={styles.recipeDetailsContainer}>
          {skill_level && (
            <View style={styles.recipeDetailTextContainer}>
              <Text
                style={[styles.requirementSubtitle, styles.recipeDeailName]}
              >
                Difficulty
              </Text>
              <Text style={styles.recipeDetailValue}>{skill_level.value}</Text>
            </View>
          )}
          {spice_level && (
            <View style={styles.recipeDetailTextContainer}>
              <Text
                style={[styles.requirementSubtitle, styles.recipeDeailName]}
              >
                Spiciness
              </Text>
              <Text style={styles.recipeDetailValue}>{spice_level.value}</Text>
            </View>
          )}
          {cooking_time && (
            <View style={styles.recipeDetailTextContainer}>
              <Text
                style={[styles.requirementSubtitle, styles.recipeDeailName]}
              >
                Time
              </Text>
              <Text style={styles.recipeDetailValue}>
                {this.getTime(cooking_time.value)}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.heading}>From Your Kitchen</Text>

        <View style={styles.kitchenRequirementsContainer}>
          {!extraIngredientsOpened && (
            <View style={styles.infoContainer}>
              <View style={styles.requirementContainer}>
                <Text style={styles.requirementSubtitle}>Equipment</Text>
                <SeeMore
                  id="equipment"
                  maxHeight={50}
                  lines={2}
                  toggleCallback={this.toggle}
                  setTruncated={this.setTruncated}
                  isOpen={equipmentOpened}
                >
                  <Text style={styles.requirementText}>
                    {equipment.value.replace(/\s*,\s*/g, ", ")}
                  </Text>
                </SeeMore>
                {this.state.equipmentTruncated && (
                  <TouchableOpacity
                    style={styles.toggleIcon}
                    onPress={() => this.toggle("equipment")}
                  >
                    {this.getIcon(equipmentOpened)}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}

          {!equipmentOpened && (
            <View style={styles.infoContainer}>
              <View style={styles.requirementContainer}>
                <Text style={styles.requirementSubtitle}>
                  Extra Ingredients
                </Text>
                <SeeMore
                  id="extraIngredients"
                  maxHeight={50}
                  lines={2}
                  toggleCallback={this.toggle}
                  setTruncated={this.setTruncated}
                  isOpen={extraIngredientsOpened}
                >
                  <Text style={styles.requirementText}>
                    {extra_ingredients_needed &&
                      extra_ingredients_needed.value.replace(/\s*,\s*/g, ", ")}
                  </Text>
                </SeeMore>
                {this.state.extraIngredientsTruncated && (
                  <TouchableOpacity
                    style={styles.toggleIcon}
                    onPress={() => this.toggle("extraIngredients")}
                  >
                    {this.getIcon(extraIngredientsOpened)}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }

  getIcon(isOpen) {
    const iconType = isOpen ? "chevronUp" : "chevronDown";
    return <FontAwesome>{Icons[iconType]}</FontAwesome>;
  }

  getTime(timeStr) {
    const timeInMin = parseFloat(timeStr, 10);
    if (!timeInMin || timeInMin === 0) return "0 min";
    let hours = "";

    let mins = timeInMin % 60;

    if (timeInMin > 59) {
      hours = Math.floor(timeInMin / 60);
      if (hours > 1) hours = `${hours} hrs`;
      else hours = `${hours} hr`;
    }
    if (mins > 0) {
      if (mins > 1) mins = `${mins} mins`;
      else mins = `${mins} min`;
    }
    return hours === "" ? mins : `${hours} ${mins}`;
  }
  setTruncated(id) {
    switch (id) {
      case "equipment":
        this.setState({ equipmentTruncated: true });
        break;
      case "extraIngredients":
        this.setState({
          extraIngredientsTruncated: true
        });
        break;
      default:
    }
  }
  toggle = id => {
    const { extraIngredientsOpened, equipmentOpened } = this.state;
    switch (id) {
      case "equipment":
        this.setState({ equipmentOpened: !equipmentOpened });
        break;
      case "extraIngredients":
        this.setState({ extraIngredientsOpened: !extraIngredientsOpened });
    }
  };
}
const styles = StyleSheet.create({
  body: {
    height: "100%"
  },
  heading: {
    ...typography.productSmall,
    paddingBottom: 5
  },
  recipeDetailsContainer: {
    paddingBottom: 10,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  recipeDetailTextContainer: {
    ...typography.constants,
    textAlign: "center",
    fontSize: 14,
    color: colors.darkGray
  },
  recipeDeailName: {
    textAlign: "center"
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
    flexDirection: "column",
    flex: 1
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  requirementSubtitle: {
    ...typography.productSubtitle,
    width: 120
  },
  requirementText: {
    ...typography.constants,
    fontSize: 12
  },
  toggleIcon: {
    alignSelf: "center",
    padding: 10
  },
  requirementContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start"
  }
});
