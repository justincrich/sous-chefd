import React, { Component } from "react";
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import colors from "/styles/colors.js";
import Notification from "/core-components/notification/notification.js";
import Header from "/core-components/header/header.js";
import propTypes from "prop-types";
export default class Body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationVisible: false
    };
    this.styles = StyleSheet.create({
      container: {
        position: "relative",
        flex: 1,
        display: "flex",
        backgroundColor: colors.white,
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 100,
        paddingBottom: 20
      }
    });
  }

  componentWillUpdate(newProps) {
    const { notification: newNotification } = newProps;
    const { notification: oldNotification } = this.props;

    if (newNotification != oldNotification) {
      this.toggleNotification();
    }
  }

  toggleNotification() {
    this.setState({ notificationVisible: true });

    setTimeout(() => {
      this.setState({ notificationVisible: false });
    }, 3000);
  }

  render() {
    const {
      notification,
      headerLeftAction,
      headerRightAction,
      headerLeftIcon,
      headerRightIcon,
      isHeader
    } = this.props;
    const { notificationVisible } = this.state;
    return (
      <View
        style={{
          flex: 1,
          maxHeight: Dimensions.get("screen").height,
          maxWidth: Dimensions.get("screen").width
        }}
      >
        {isHeader && (
          <Header
            onPressLeft={headerLeftAction}
            onPressRight={headerRightAction}
            left={headerLeftIcon}
            right={headerRightIcon}
          />
        )}
        <View style={[this.styles.container, this.props.style]}>
          {this.props.children}
          {notificationVisible && <Notification message={notification} />}
        </View>
      </View>
    );
  }
}
Body.propTypes = {
  notification: propTypes.string,
  headerLeftAction: propTypes.func,
  headerRightAction: propTypes.func,
  headerLeftIcon: propTypes.string,
  headerRightIcon: propTypes.string,
  isHeader: propTypes.bool
};
