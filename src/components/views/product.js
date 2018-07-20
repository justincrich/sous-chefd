import React, { Component } from "react";
import "babel-polyfill";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Image,
  PixelRatio
} from "react-native";
import { Body, ChefdButton } from "/core-components/index";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import ProductOverview from "/core-components/product/detail_header/detail_header_component.js";
import DetailsFolder from "/core-components/product/details_folder/details_folder_component.js";
import * as testdata from "./testdata.json";
import Carousel from "/core-components/carousel/carousel.js";
export default class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areNutritionalFactsVisible: false
    };
  }

  componentWillMount() {}

  render() {
    let {
      product,
      product: { title, images, variants, metafields },
      type
    } = this.props;
    let { areNutritionalFactsVisible } = this.state;
    return (
      <Body
        style={styles.body}
        isHeader
        headerLeftIcon={"arrowLeft"}
        headerLeftAction={() => this.props.goBack()}
      >
        {product &&
          !areNutritionalFactsVisible && (
            <View style={{ flex: 1 }}>
              {this.getCarousel(images, metafields)}
              <ProductOverview
                title={title}
                variants={variants}
                metafields={metafields}
                style={styles.productOverview}
              />
              <DetailsFolder
                product={product}
                toggleNutritionalFacts={this.props.toggleNutritionalFacts}
                style={styles.detailFolder}
              />
            </View>
          )}
      </Body>
    );
  }

  getCarousel(images, { partner_image_url, partner_image_type }) {
    return (
      <View style={[styles.carouselDetails]}>
        <Carousel images={images} />
        {partner_image_url && (
          <View style={[styles.brandDetailsContainer]}>
            <View
              style={[
                styles.brandLogoContainer,
                partner_image_type.value === "chef" ? styles.round : {}
              ]}
            >
              <Image
                style={[styles.partnerLogo]}
                source={{ uri: partner_image_url.value }}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    paddingTop: 80,
    backgroundColor: colors.white,
    paddingLeft: 0,
    paddingRight: 0,
    flex: 1
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

  brandDetailsContainer: {
    marginBottom: 30,
    paddingLeft: 10,
    paddingRight: 10,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  brandLogoContainer: {
    position: "absolute",
    width: 240,
    height: 65,
    shadowOffset: { width: 2, height: 7 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    top: -30,
    zIndex: 100
  },
  round: {
    overflow: "hidden",
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    top: -100 / 2
  },
  partnerLogo: {
    flex: 1
  }
});
