import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import propTypes from "prop-types";
export default class SeeMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   isOpen: false
    };

    this.numberOfLines = null;
    this.expandable = false;

    this.onLayout = this.onLayout.bind(this);
    // this.toggle = this.toggle.bind(this);
    this.checkTruncated = this.checkTruncated.bind(this);
  }

  componentWillReceiveProps() {
    if (!this.props.id) {
      throw new Error("SeeMore: No ID provided");
    }
    if (!this.props.maxHeight) {
      throw new Error("SeeMore: You must provide a maximum height");
    }
    if (!this.props.lines) {
      throw new Error("SeeMore: prop type 'line' must be an int");
    }
    this.setState({
      numberOfLines: null,
      opacity: 0
    });
  }

  render() {
    const { text, label, seeMoreLink, isOpen, maxHeight } = this.props;

    return (
      <Text
        numberOfLines={isOpen ? null : this.numberOfLines}
        onLayout={this.onLayout}
        style={{ flex: 1 }}
      >
        {this.props.children}
      </Text>
    );
  }

  onLayout({ nativeEvent }) {
    const { height } = nativeEvent.layout;
    if (height === 0) return false;
    if (!this.originalHeight) this.setOriginalHeight(height);
    if (!this.numberOfLines) this.checkTruncated(height);
  }

  setOriginalHeight(height) {
    this.originalHeight = height;
  }
  checkTruncated(height) {
    if (height > this.props.maxHeight) {
      this.numberOfLines = this.props.lines;
      this.expandable = true;
      this.props.setTruncated(this.props.id);
      this.forceUpdate();
    }
  }
  //   toggle() {
  //     if (this.state.isOpen === false) {
  //       console.log("open", this.props);
  //       this.props.toggleCallback(true);
  //       this.setState({ isOpen: true });
  //     } else {
  //       this.props.toggleCallback(false);
  //       this.setState({ isOpen: false });
  //     }
  //   }
}

SeeMore.propTypes = {
  id: propTypes.string.isRequired,
  lines: propTypes.number.isRequired,
  seeMoreLink: propTypes.bool,
  setTruncated: propTypes.func,
  toggleCallback: propTypes.func
};
