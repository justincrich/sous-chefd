
import React from 'react';
import { View } from 'react-native';
import loadFonts from '/assets/fonts/fonts.js';
export default class LoadStuff extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loaded: null
        }
    }
  
    async componentWillMount(){
        await loadFonts()
        this.setState({loaded:true})
      }
  
    render() {
      return (
        <View style={{flex:1}}>
            { this.state.loaded &&
                this.props.children
            }
        </View>
      )
    }
  }