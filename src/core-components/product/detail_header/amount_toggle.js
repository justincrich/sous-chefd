import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import PropTypes from "prop-types";
export default class AmountToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.toggleSelected = this.toggleSelected.bind(this);
    this.getOptions = this.getOptions.bind(this);
  }
  componentWillMount() {
    if (!this.props.onChange) {
      throw new Error("AmmountToggle: no onChange function provided.");
    }
    if (!this.props.variants) {
      throw new Error("AmmountToggle: no price variant provided.");
    }
    if (!this.props.selected) {
      throw new Error("AmmountToggle: no selected ID provided.");
    }
  }
  render() {
    const { selected, variants } = this.props;

    return (
      <View style={[styles.body]}>{this.getOptions(variants, selected)}</View>
    );
  }
  getOptions(variants, selected) {
    return Object.values(variants).map((variant, index) => (
      <TouchableWithoutFeedback
        onPress={() => this.toggleSelected(variant.serving)}
      >
        <View
          style={[
            styles.option,
            selected == variant.serving && styles.selected
          ]}
        >
          <Text
            style={[
              styles.optionText,
              selected == variant.serving && styles.selected
            ]}
          >
            {`For ${variant.serving}`}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    ));
  }
  toggleSelected(servingAmount) {
    console.log(servingAmount);
    this.props.onChange(servingAmount);
  }
}

const styles = StyleSheet.create({
  body: {
    display: "flex",

    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.charchoal,
    borderRadius: 100 * 0.3,
    overflow: "hidden"
  },
  option: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 10,
    alignItems: "center",
    paddingVertical: 5
  },
  selected: {
    backgroundColor: "#4E4E4E",
    color: colors.white
  }
});

AmountToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
  variants: PropTypes.array.isRequired
};
