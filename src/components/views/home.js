import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Body from "/core-components/body/body.js";
import Header from "/core-components/header/header.js";
import typography from "/styles/typography.js";
import Logo from "/core-components/logo/logo";
import { TextField, IconButton } from "/core-components/index.js";
import colors from "/styles/colors.js";
import FontAwesome, { Icons } from "react-native-fontawesome";

export default class Home extends Component {
  static defaultProps ={
    notification:''
  }
  constructor(props) {
    super(props);
    this.state = {
      fieldValue:''
    };
    this.handleEnter = this.handleEnter.bind(this);
  }


  handleEnter() {
    this.props.search(this.state.fieldValue);
  }
  render() {
    return (
      <Body style={styles.body} notification={this.props.notification}>
        <View style={styles.container}>
          <Logo bodyStyle={{ marginBottom: 10 }} />
          <View style={styles.inputContainer}>
            <TextField
              value={this.state.fieldValue}
              onChangeText={text => this.setState({ fieldValue: text })}
              placeholder={"What would you like to cook?"}
              style={styles.textField}
              onSubmitEditing={this.handleEnter}
              returnKeyType="search"
              icon="search"

            />

            {/* <IconButton
                icon={'mapMarker'}
                style={styles.iconButton}
              /> */}
          </View>
        </View>
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    width: "80%",
    maxWidth: 500,
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: "30%"
  },

  inputContainer: {
    position: "relative",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  magIcon: {
    position: "absolute",
    fontSize: 14,
    left: -10,
    color: colors.charcoal
  },
  iconButton: {
    marginLeft: 10
  }
});
