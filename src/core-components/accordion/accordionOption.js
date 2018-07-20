import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Animated,Dimensions } from "react-native";
import colors from "/styles/colors.js";
import typography from "/styles/typography.js";
import FontAwesome, { Icons } from "react-native-fontawesome";
export default class AccordionOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleIcon: "chevronDown",
      isOpen: false,
      animatedHeight: new Animated.Value(0),
      optionOpacity: new Animated.Value(0)
    };
    this.getContents = this.getContents.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setMaxHeight = this.setMaxHeight.bind(this)
    this.setMinHeight = this.setMinHeight.bind(this)
  }

  getToggleIcon(isOpen) {
    const iconType = isOpen ? "chevronUp" : "chevronDown";
    return Icons[iconType];
  }

  getContents(data){
    const {isOpen,optionOpacity} = this.state;
    return data.map((item,index)=>(
      <Text
        key={index}
        style={[styles.accordionContentsText]}
      >{item}
      </Text>
    ))
  }

  toggle(){
    const {isOpen,animatedHeight,maxHeight,minHeight} = this.state;
    if(isOpen){
      this.setState({isOpen:false})
      //toggle close
      Animated.spring(animatedHeight,{
        toValue:minHeight,
        duration:1000
      }).start()
    }else{
      this.setState({isOpen:true})
      //toggle open
      Animated.spring(animatedHeight,{
        toValue:maxHeight+minHeight,
        duration:1000
      }).start()
    }
  }

  setMaxHeight(event){
    this.setState({
        maxHeight   : event.nativeEvent.layout.height
    });
}

setMinHeight({nativeEvent:{layout:{height}}}){
    this.setState({
        minHeight   : height,
        animatedHeight: new Animated.Value(height),
    });
}

  render() {
    const {data} = this.props;
    const {isOpen,animatedHeight} = this.state;
    return (
      <Animated.View style={[styles.body, {height:animatedHeight}]}>
        <View style={styles.headingContainer}
          onLayout={this.setMinHeight}
        >
          <Text style={[typography.sectionHeading, styles.heading]}>
            {this.props.title}
          </Text>
          <TouchableOpacity
            onPress={this.toggle}
          >
            <FontAwesome>{this.getToggleIcon(this.state.isOpen)}</FontAwesome>
          </TouchableOpacity>
        </View>
        <View
            style={[styles.accordionContents]}
            onLayout={this.setMaxHeight}
        >

        {
          data &&
          this.getContents(data)
        }

        </View>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "column",
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    overflow:"hidden"
    
  },
  headingContainer: {
    paddingTop:30,
    paddingBottom:30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width:'100%'
  },
  heading: {
    fontSize: 14
  },
  accordionContents:{
      display:'flex',
      flexDirection:'column',
      paddingBottom:15
  },
  accordionContentsText:{
      ...typography.constants,
      letterSpacing:.4,
      fontSize:14,
      paddingTop:10,
      paddingBottom:10
  }
});
