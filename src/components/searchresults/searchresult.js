import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import colors from "/styles/colors.js";
import picture from "/assets/images/BEEF13.2_20Hero.png";
import typography from "/styles/typography.js";
import FontAwesome, { Icons } from "react-native-fontawesome";
import ChefdButton from "/core-components/buttons/standard_button.js";
import { LinearGradient } from "expo";
import cio from "cheerio-without-node-native";

export default class SearchResult extends Component {
  static defaultProps ={
    isRetail:false
  }
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.parseHTML = this.parseHTML.bind(this);
    this.open = this.open.bind(this)
  }
  getStores(tags){
    const cutIndex = tags.indexOf('retailer:')+9;
    let endIndex;
    if(endIndex = tags.indexOf(',',cutIndex) === -1) endIndex = tags.length-1;
    return tags.substr(cutIndex,endIndex).replace(/\s/g, "").split(';');
  }
  async componentWillMount() {
    const {
      body_html,
      images,
      title,
      vendor,
      id,
      variants,
      tags
    } = this.props.result;
    let parsedHTML={};
    // if (body_html) {
    //   try{
    //     parsedHTML = await this.parseHTML(body_html);
    //   }catch(e){
    //     console.log(e)
    //   }
    // }
    let stores = [];
    if(this.props.isRetail){
      stores = this.getStores(tags);
    }

    let image;
    if(images.length>0){
      image = images[0].src;
    }

    this.setState({
      loaded: true,
      imageUri: image,
      title,
      vendor,
      id,
      variants: variants,
      stores

    });
  }

  parseHTML(html) {
    return new Promise((res, rej) => {
      try {
        const $ = cio.load(html);
        // const a = $(".recipe-stats ul li").each(function(i, elm) {
        //   let liText = $(this).text();
        //   if (liText.indexOf("Est. Cooking Time:") != -1) {
        //     let breakIndex = liText.indexOf(":") + 1;
        //     let slicedTime = liText.slice(breakIndex).trim();
        //     res(slicedTime);
        //   }
        // });
        const description = $(".product-description").text();

        res(description)
      } catch (e) {
        rej(e);
      }
    });
  }

  getButtons(variants) {
    return variants.map(
      ({title,price}, index) => {
        const intPrice = parseInt(price);
        const amount = title.substring(0,title.indexOf('Serving')-1).trim();

        return (
          <ChefdButton style={[styles.btn]} key={index}>
            <Text >
            <Text style={[ styles.btnTxtMuted]}>
              For {amount}  
            </Text>
            <Text style={[typography.btn, styles.btnTxtPrice]}>
              {`  $${intPrice}`}
            </Text>
            </Text>
          </ChefdButton>
        );
      }
    );
  }

  open(e){

    this.props.openProduct(this.props.result)
  }

  render() {
    const {
      prepTime,
      imageUri,
      loaded,
      title,
      vendor,
      description,
      id,
      variants,
      isRetail
    } = this.state;

    return (
      <TouchableOpacity style={styles.body} onPress={this.open}>
        {loaded && (
          <View>
            <View style={styles.previewContainer}>
              <LinearGradient
                colors={["#000", "transparent"]}
                style={styles.gradientOverlay}
                start={[0.5, -0.25]}
                end={[0.5, 0.5]}
              />
              <Text style={[typography.constantsBold, styles.prepTxt]}>
                {prepTime}
              </Text>
              <Image
                source={{ uri: imageUri }}
                style={styles.img}
                resizeMethod="scale"
              />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {title}
              </Text>
              <Text style={[typography.productSubtitle, styles.subTitle]}>
                By <Text>{vendor}</Text>
              </Text>
            </View>
            <View style={styles.actionContainer}>
              {
                !this.props.isRetail &&
                <View style={styles.btnContainer}>
                {(variants.length > 0) && this.getButtons(variants)}
              </View>
              }
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 20
  },
  previewContainer: {
    width: "100%",
    height:265,
    position: "relative"
  },
  gradientOverlay: {
    position: "absolute",
    zIndex: 100,
    opacity: 0.7,
    width: "100%",
    height: "100%"
  },
  prepTxt: {
    color: colors.white,
    position: "absolute",
    zIndex: 150,
    top: 15,
    left: 15
  },
  img: {
    zIndex: 50,
    width: "100%",
    height: "100%",
    marginBottom: 15
  },
  titleContainer: {
    paddingLeft: 15,
    paddingRight: 15
  },
  title: {
    ...typography.productSmall,
    marginBottom: 4
  },
  actionContainer: {
    padding: 10,
    display: "flex",
    flexDirection: "row"
  },
  subTitle: {},
  favContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  favIcon: {
    fontSize: 20,
    color: colors.mediumGray
  },
  heartCount: {
    marginLeft: 3,
    fontSize: 20,
    position: "relative",
    top: 2,
    color: colors.mediumGray
  },
  btnContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto"
  },
  btn: {
    width: 120,
    height: 40,
    alignItems:'baseline',
    marginRight:6
    // display: "flex",
    // flexDirection:'row',
    // justifyContent: "center"
  },
  btnTxtMuted: {
    ...typography.btnMuted,
    opacity: 0.98,
    
  },
  btnTxtPrice: {
    fontSize: 20
  }
});
