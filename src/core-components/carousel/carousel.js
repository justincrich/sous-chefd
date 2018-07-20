import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import colors from "/styles/colors.js";
const { width, height } = Dimensions.get("window");
import Swiper from "react-native-swiper";
import FontAwesome, { Icons } from "react-native-fontawesome";

export default class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
    this.styles = {};
    //this.moveIndexForwards = this.moveIndexForwards.bind(this)
  }

  componentWillMount() {
    const { images } = this.props;

    this.styles = StyleSheet.create({
      carouselContainer: {
        // position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        // flexGrow:1,
        height: 250,
        left: 0,
        top: 0
      },
      swiper: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        paddingLeft: 0,
        paddingHorizontal: 0
      },
      image: {
        width: "100%",
        height: "100%"
      },
      // carouselButton:{
      //   flex:1,
      //   justifyContent:'center'
      //   },
      // carouselButtonContainer: {

      //   zIndex:300,
      //   height:'100%',
      //   display:'flex',
      //   justifyContent:'center'

      // },
      carouselIconBody: {
        position: "relative",
        width: 40,
        height: 40,
        display: images.length > 1 ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center"
      },
      carouselIcon: {
        zIndex: 1000
      },
      carouselIconBackground: {
        position: "absolute",

        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        opacity: 0.5,
        zIndex: 100
      }
    });
  }

  getImage(images) {
    //return images.map(({node:{id,transformedSrc}},index) => (<Image key={index} style={this.styles.image} source={{uri:transformedSrc}} />));
    return images.map((image, index) => (
      <Image
        key={index}
        style={this.styles.image}
        source={{ uri: image.src }}
      />
    ));
  }

  render() {
    const { images } = this.props;
    console.log(images);
    return (
      <View style={[this.styles.carouselContainer, this.props.style]}>
        {images && (
          <Swiper
            showsButtons={false}
            loop={true}
            style={this.styles.swiper}
            activeDotColor={"transparent"}
            dotColor={"transparent"}
            // prevButton={
            //   <View style={[this.styles.carouselIconBody, this.styles.left]}>
            //     <FontAwesome style={this.styles.carouselIcon}>
            //       {Icons.chevronLeft}
            //     </FontAwesome>
            //     <View style={this.styles.carouselIconBackground} />
            //   </View>
            // }
            // nextButton={
            //   <View style={[this.styles.carouselIconBody, this.styles.right]}>
            //     <FontAwesome style={this.styles.carouselIcon}>
            //       {Icons.chevronRight}
            //     </FontAwesome>
            //     <View style={this.styles.carouselIconBackground} />
            //   </View>
            // }
          >
            {this.getImage(images)}
          </Swiper>
        )}
        {/* <View style={[this.styles.carouselButtonContainer, this.styles.right]}>
                <TouchableOpacity style={[this.styles.carouselButton]}
                    onPress={()=>this.moveIndexForwards(true)}
                >
                  <View style={[this.styles.carouselIconBody, this.styles.right]}>
                    <FontAwesome style={this.styles.carouselIcon}>
                      {Icons.chevronRight}
                    </FontAwesome>
                    <View style={this.styles.carouselIconBackground} />
                  </View>
                </TouchableOpacity>
              </View> */}
      </View>
    );
  }
}
