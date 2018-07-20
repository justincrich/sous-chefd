import React from "react";
import { Text } from "react-native";
import _ from "lodash";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import LoadStuff from "../loadstuff";
import Home from "/components/views/home";
import Results from "/components/views/results";
import NutritionalFacts from "/components/views/nutritional_facts";
import loadFonts from "/assets/fonts/fonts.js";
import AccordianView from "./Accordion/accordionView";
import Product from "/components/views/product.js";
import ProductWebView from "/components/views/product_webview.js";
import ProductRetail from "/components/views/product_retail";
import Button from "./Button/button";
import Header from "/core-components/header/header.js";
import * as data from "../mocks/productobj.json";
import * as retail_product from "../mocks/retailobj.json";
import * as product_metadata from "../mocks/singleproductmetadata.json";

import "babel-polyfill";
const metafields = transform(product_metadata.metafields);

const onlineData = data.products;
const retailData = retail_product.products;
//images
const images = [];
const stub = {
  goBack: () => {}
};
console.log(metafields["nutritional_image_url"].value);
storiesOf("Views", module)
  .add("Nutritional Facts", () => (
    <LoadStuff>
      <NutritionalFacts
        nutritional_image_url={metafields["nutritional_image_url"].value}
      />
    </LoadStuff>
  ))
  .add("Product", () => (
    <LoadStuff>
      <Product
        product={{ ...onlineData[0], metafields }}
        toggleNutritionalFacts={() => {}}
      />
    </LoadStuff>
  ))
  .add("Product Retail", () => (
    <LoadStuff>
      <ProductRetail product={retailData[0]} />
    </LoadStuff>
  ))
  .add("Results", () => (
    <LoadStuff>
      <Results
        navigation={stub}
        retailData={[retailData[0]]}
        onlineData={onlineData}
      />
    </LoadStuff>
  ))

  .add("Product Web", () => (
    <LoadStuff>
      <Header />
      <ProductWebView data={data} />
    </LoadStuff>
  ))

  .add("Home", () => (
    <LoadStuff>
      <Home />
    </LoadStuff>
  ));

function transform(array) {
  return _.keyBy(array, o => o.key);
}
// storiesOf('Components',module)
// storiesOf('TextTest',module)
// .add('Accordian View',()=>(<LoadStuff><AccordianView/></LoadStuff>))
//   .add('Text',()=><LoadStuff><TextTest/></LoadStuff>)

// .add('Button',()=>
// <LoadStuff><Button/></LoadStuff>
// )

//   .add('Carousel',()=><LoadStuff><Carousel/></LoadStuff>)
