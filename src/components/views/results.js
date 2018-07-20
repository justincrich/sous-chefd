import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  SectionList
} from "react-native";
import Body from "/core-components/body/body.js";
import typography from "/styles/typography.js";
import { TextField, IconButton } from "/core-components/index.js";
import colors from "/styles/colors";
import FontAwesome, { Icons } from "react-native-fontawesome";
import SearchResult from "/components/searchresults/searchresult";
import { MapView } from "expo"; //need to set this up for android
import Icon from "react-native-fontawesome";
export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { mapVisible: false, filterVisible: false, flatListLoaded:false};
    this.handleEnter = this.handleEnter.bind(this);
    this.getMap = this.getMap.bind(this);
    this.checkLocation = this.checkLocation.bind(this);
    this.displayData = this.displayData.bind(this);
  }

  handleEnter() {}
  getMap() {
    return (
      <View style={styles.mapContainer}>
        <MapView style={styles.map} />
      </View>
    );
  }

  getPosition(options = {}) {
    return new Promise(function(res, rej) {
      navigator.geolocation.getCurrentPosition(res, rej, options);
    });
  }

  checkLocation() {}

  render() {
    const { onlineData,retailData, navigation: { goBack }, query } = this.props;
    const totalResults = onlineData.length + retailData.length;
    return (
      <Body style={styles.body} isHeader headerLeftAction={() => goBack()} headerLeftIcon={"arrowLeft"}>

        <Text
          style={styles.headingText}
        >
          I found you {totalResults} ideas {
            query != ""&&
            `for ${query}`
          }
        </Text>
        {onlineData && this.displayData(onlineData,retailData)}
      </Body>
    );
  }

  displayData(onlineData,retailData) {
    const {openProduct} = this.props;
    function genResults(type,result) {
      if(type==='online'){
        return <SearchResult result={result.item} openProduct={(item)=>openProduct({...item,type})}/>;
      }else if(type==='retail'){
          return <SearchResult isRetail result={result.item} openProduct={(item)=>openProduct({...item,type})}/>;
      }
    }

    function genHeader({section}) {
      
      if(section.data.length>0){
        return(
          <View style={styles.sectionHeadingContainer}>
          <Text style={[typography.constantsBold, styles.sectionHeading]}>
            {
              section.title === 'online'?
              "Avaliable Online"
              :
              "At A Store Near You"
            }
          </Text>
        </View>
        )
      }


    }
    //data={editData}
    return (
      <SectionList
          scrollEventThrottle={60}
          onScroll={()=>this.setState({flatListLoaded:true})}
          sections={[
            {data:retailData,renderItem:(item)=>genResults('retail',item),title:'retail'},
            {data:onlineData,renderItem:(item)=>genResults('online',item),title:'online'},
          ]}
          style={styles.searchResultContainer}

          renderSectionHeader={genHeader}
          onEndReachedThreshold={.5}
          refreshing={this.props.loading}
          onEndReached={()=>{

            if(this.state.flatListLoaded && !this.props.loading){
              //this.props.getMoreProducts()
            }
          }}
        />
    );
  }


}


//<View ></View>
const styles = StyleSheet.create({
  body: {
    backgroundColor: colors.lightGray
  },
  headingText:{
    ...typography.sectionHeading,
    textAlign:'left',
    width:"100%"
  },
  sectionHeadingContainer: {
    backgroundColor:colors.lightGray,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: colors.mediumGray,
    marginBottom: 20,
    paddingTop: 20,
    padding: 5
  },
  searchResultContainer: {
    // marginTop:100,
    width: "100%",
    flex:1,
    paddingLeft: 5,
    paddingRight: 5
  },
  sectionHeading: {},
  localMarketTO: {},
  localMarketText: {
    fontSize: 12
  },
  mapContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  map: {
    width: "100%",
    height: 300
  }
});
