import React from 'react'
import {View} from 'react-native'
import AccordianInterface from '/core-components/accordion/accordionInterface.js'
import * as accordionOptions from './filterOptions.json'
export default function(props){
    return(
        <View>
            <AccordianInterface
                data={accordionOptions.data}
            />
        </View>
    )
}