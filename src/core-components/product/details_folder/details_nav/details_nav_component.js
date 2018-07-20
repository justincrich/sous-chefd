import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import propTypes from "prop-types";
import FontAwesome, { Icons } from "react-native-fontawesome";
export default function DetailsFolderNav(props) {
  let { data, activeIndex, onSelect } = props;
  const styles = StyleSheet.create({
    navContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      borderTopWidth: 2,
      borderBottomWidth: 2,
      borderColor: colors.mediumGray
    },
    tab: {
      // paddingLeft: 10,
      // paddingRight: 10,
      flex: 1,
      padding: 10,
      alignItems: "center",
      justifyContent: "center"
    },
    active: {
      backgroundColor: colors.mediumGray
    },
    icon: {
      fontSize: 30,
      color: activeIndex === 0 ? colors.white : colors.darkGray
    },
    iconImageContainer: {
      width: 30,
      height: 30
    },
    iconImage: {
      width: "100%",
      height: "100%",
      alignSelf: "center",
      resizeMode: "cover"
    }
  });
  // function genTab(tabData) {
  //   return tabData.map(item => (
  //     <View style={styles.tab}>
  //       <Text>{item.title}</Text>
  //     </View>
  //   ));
  // }
  return (
    <View style={styles.navContainer}>
      <TouchableOpacity
        style={[styles.tab, getActive(0, activeIndex)]}
        onPress={() => onSelect(0)}
      >
        <Text style={styles.icon}>
          <FontAwesome>{Icons.infoCircle}</FontAwesome>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, getActive(1, activeIndex)]}
        onPress={() => onSelect(1)}
      >
        <View style={styles.iconImageContainer}>
          <Image
            style={styles.iconImage}
            source={
              activeIndex === 1
                ? require("/assets/icons/whisk-white.png")
                : require("/assets/icons/whisk.png")
            }
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, getActive(2, activeIndex)]}
        onPress={() => onSelect(2)}
      >
        <View style={styles.iconImageContainer}>
          <Image
            style={styles.iconImage}
            source={
              activeIndex === 2
                ? require("/assets/icons/groceries-bag-white.png")
                : require("/assets/icons/groceries-bag.png")
            }
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  function getActive(id, index) {
    if (id === index) {
      return styles.active;
    } else {
      return {};
    }
  }
}

DetailsFolderNav.propTypes = {
  activeIndex: propTypes.number.isRequired,
  onSelect: propTypes.func.isRequired
};
