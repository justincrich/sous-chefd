import React from 'react';
import { Text, View } from 'react-native';
import {ChefdButton} from '/core-components/index';
import typography from "/styles/typography.js";
export default function (props){
    return(
        <View style={{height:100,width:100,justifyContent:'space-between'}}>
            <ChefdButton
                buttonText='For 10 $31'
            />
            <ChefdButton
                style={{width:100}}
            >
                <Text
                    style={typography.btn}
                >
                    <Text
                        style={{opacity:.7,fontSize:16}}
                    >
                        For 10
                    </Text>
                    <Text
                        style={{fontSize:24}}
                    >
                    {' $31'}
                    </Text>
                </Text>
            </ChefdButton>
        </View>
    )
}