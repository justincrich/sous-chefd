import React, { Component } from "react";
import "babel-polyfill";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import FontAwesome, { Icons } from "react-native-fontawesome";
import { Body, ChefdButton } from "/core-components/index";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import Header from "/core-components/header/header.js";
import SVGImage from "react-native-svg-image";

import Icon from "react-native-fontawesome";
import AccordionInterface from "/core-components/accordion/accordionInterface.js";
import * as testdata from "./testdata.json";

import Carousel from "/core-components/carousel/carousel.js";
export default class ProductRetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getOverview = this.getOverview.bind(this);
  }

  componentWillMount() {
    const dessertIndex = Math.floor((Math.random() * 2));
    const drinkIndex = Math.floor((Math.random() * 2));
    const desserts = [{img:require('/assets/recommendations/applepie.png'), title:'Apple Pie',retailer:'Gelson\'s'},{img:require('/assets/recommendations/mouse.png'),title:'Mouse',retailer:'Gelson\'s'}]
    const drinks = [{img:require('/assets/recommendations/dietcoke.png'),title:'Diet Coke',retailer:'Gelson\'s'},{title:'Dasani Watter',retailer:'Gelson\'s',img:require('/assets/recommendations/dasani.png')}]
    const recommendations={
      dessert:desserts[dessertIndex],
    drink:drinks[drinkIndex]
    };
    this.setState({ product: this.props.product, recommendations
       });
  }

  render() {
    const { product, recommendations } = this.state;
    const {goBack} = this.props;

    return (
      <Body style={[styles.body]}>
        <Header left="arrowLeft" onPressLeft={() => goBack()}/>
        {product && (
          <ScrollView style={styles.scroll}>
            {this.getCarousel(product)}
            {this.getOverview(product)}
            {this.getSuggestions(recommendations)}
          </ScrollView>
        )}
      </Body>
    );
  }

  getCarousel({ images }) {
    return (
      <View style={styles.carouselDetails}>
        <Carousel images={images} />
        {/* <View style={styles.brandDetailsContainer}>
          <View style={styles.brandLogoContainer}>
            <Image style={styles.brandLogo} />
          </View>
        </View> */}
      </View>
    );
  }

  getSuggestions(recommendations) {
    return (
      <View style={styles.suggestionSectionContainer}>
        <Text style={styles.suggestionHeading}>Suggested Pairings</Text>
        <View style={styles.suggestionContainer}>
          <View style={styles.suggestionContentHolder}>
            <Image
              source={recommendations.drink.img}
              style={styles.suggestionImage}
            />
            <Text style={styles.suggestionText}>{recommendations.drink.title}</Text>
            <Text style={styles.suggestionPartner}>{`Available at ${recommendations.drink.retailer}`}</Text>
          </View>
          <View style={styles.suggestionContentHolder}>
            <Image
              source={recommendations.dessert.img}
              style={styles.suggestionImage}
            />
            <Text style={styles.suggestionText}>{recommendations.dessert.title}</Text>
            <Text style={styles.suggestionPartner}>{`Available at ${recommendations.dessert.retailer}`}</Text>
          </View>
        </View>
      </View>
    );
  }

  getOverview({ title }) {
    return (
      <View style={styles.productOverviewContainer}>
        <Text style={[typography.productMedium, styles.title]}>{title}</Text>
        <Text style={[typography.productSubtitle, styles.subtitle]} />
        <TouchableOpacity style={styles.cta}>
          <FontAwesome style={styles.ctaIcon}>{Icons.mapMarker}</FontAwesome>
        <Text style={styles.ctaText}>Get it tonight!</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 110,
    backgroundColor: colors.white,
    paddingLeft: 0,
    paddingRight: 0
  },
  swiperContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column"
  },
  left: {
    left: 0
  },
  right: {
    right: 0
  },
  scroll: {
    flex: 1,
    width: "100%"
  },
  carouselDetails: {
    marginBottom: 45
  },
  productOverviewContainer: {},
  brandDetailsContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  brandLogoContainer: {
    position: "absolute",
    width: 125,
    height: 65,
    shadowOffset: { width: 2, height: 7 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    top: -32
  },
  brandLogo: {},
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 7.5
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20
  },
  cta:{
    position:'relative',
    justifyContent:'center',
    alignItems:'center',
    display:'flex',
    flexDirection:'row',
    bottom:20
  },
  ctaIcon:{
    color:colors.orange,
    fontSize:14,
    marginRight:5,
    paddingBottom:2
  },
  ctaText:{
    ...typography.link
  },
  divider: {
    width: "100%",
    height: 0,
    borderWidth: 0.75,
    borderColor: colors.mediumGray
  },
  suggestionSectionContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 20
  },
  suggestionHeading: {
    color: colors.charcoal,
        fontFamily: "sentinel-bold",
        fontSize: 20,
    textAlign: "center",
    
  },
  suggestionContainer: {
    marginTop:20,
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  suggestionContentHolder:{
      display:'flex',
      flexDirection:'column',
      alignItems:'center'
  },
  suggestionImage: { 
      width: 150, 
      height: 150,
      borderRadius:75,
       borderWidth:2,
       borderColor:colors.mediumGray,
       marginBottom:10
    },
    suggestionText:{
        color: colors.charcoal,
        fontFamily: "sentinel-bold",
        fontSize: 18
    },
    suggestionPartner:{
        color: colors.orange,
        fontFamily: "sentinel",
        fontSize: 16
    }
});
