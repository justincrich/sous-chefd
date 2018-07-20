import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import typography from "/styles/typography.js";
import colors from "/styles/colors.js";
import SeeMore from "/core-components/seemore/seemore_component";
export default class DetailsOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailsOpen: null,
      detailsTruncated: false,
      detailsOpen: false
    };
    this.getPairings = this.getPairings.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setTruncated = this.setTruncated.bind(this);
  }
  render() {
    const { pairings, description } = this.props;
    const { detailsOpen, detailsTruncated } = this.state;
    return (
      <View style={styles.body}>
        <View style={styles.headingContainer}>
          <Text style={[typography.sectionHeading, styles.detailsHeading]}>
            From Chef 'd
          </Text>
          <ScrollView style={styles.detailsScroll}>
            <SeeMore
              id="details"
              maxHeight={75}
              toggleCallback={this.toggle}
              setTruncated={this.setTruncated}
              lines={3}
              isOpen={detailsOpen}
            >
              <Text style={styles.detailsDescription}>
                {description.replace(/&nbsp;/g, " ")}
              </Text>
            </SeeMore>
          </ScrollView>
          {detailsTruncated && (
            <TouchableOpacity onPress={() => this.toggle("details")}>
              <Text> {detailsOpen ? "Close" : "See More"} </Text>
            </TouchableOpacity>
          )}
        </View>
        {!detailsOpen &&
          pairings.length > 0 && (
            <View style={styles.recipeDetailsSuggestedPairings}>
              <Text style={styles.recipeDetailsSuggestedPairingsHeader}>
                Suggested Pairings
              </Text>
              <View style={styles.recipeDetailsSuggestedPairingsContainer}>
                {this.getPairings(pairings)}
              </View>
            </View>
          )}
      </View>
    );
  }

  getPairings = pairingArr =>
    pairingArr.map(({ value, key }, index) => (
      <View style={styles.recipeDetailsSuggestedPairing}>
        <Image
          source={
            key === "beer_pairings"
              ? require("/assets/images/icn_beer.png")
              : require("/assets/images/icn_wine.png")
          }
          style={styles.recipeDetailsSuggestedPairingImg}
          resizeMode="contain"
        />
        <Text style={styles.recipeDetailsSuggestedPairingText}> {value} </Text>
      </View>
    ));

  setTruncated(id) {
    const { detailsTruncated } = this.state;
    if (id === "details")
      this.setState({
        detailsTruncated: true
      });
  }
  toggle = id => {
    const { detailsOpen } = this.state;
    if (id === "details")
      this.setState({
        detailsOpen: !detailsOpen
      });
  };
}
const styles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  },
  headingContainer: {
    paddingBottom: 10
  },
  detailsHeading: {
    fontSize: 16,
    marginBottom: 7.5
  },
  detailsScroll: {
    height: 75
  },
  detailsDescription: {
    ...typography.constants,
    fontSize: 14,
    color: colors.charchoal
  },
  recipeDetailsSuggestedPairings: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  recipeDetailsSuggestedPairingsHeader: {
    ...typography.sectionHeading,
    fontSize: 16,
    marginBottom: 10
  },
  recipeDetailsSuggestedPairingsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  recipeDetailsSuggestedPairing: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 100
  },
  recipeDetailsSuggestedPairingImg: {
    height: 25,
    width: 15
  },
  recipeDetailsSuggestedPairingText: {
    display: "flex",
    ...typography.constants,
    fontSize: 14,
    color: colors.charchoal,
    textAlign: "center"
  }
});
