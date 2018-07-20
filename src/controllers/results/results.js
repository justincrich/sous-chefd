import React from "react";
import Results from "/components/views/results.js";
import { Text } from "react-native";
import environment from "/env/getEnv.js";
//import * as retailData from './retailobj.json';
import ShopifyQuery from "../resources/shopifyFetcher.js";
export default class ResultsController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: "",
      loading: false,
      query: "",
      products: {}
    };
    this.getMoreProducts = this.getMoreProducts.bind(this);
    this.openProduct = this.openProduct.bind(this);
  }

  componentWillMount() {
    const {
      navigation: {
        state: { params: { data: { retailData, onlineData }, query } }
      }
    } = this.props;

    // const cursor = this.getCursor(edges)

    this.setState({
      onlineData,
      retailData,
      query
      // hasNextPage,
      // cursor:cursor,
      // retailData:rData
    });
  }

  getCursor(edges) {
    return edges.length > 0 ? edges[edges.length - 1].cursor : null;
  }

  render() {
    const { retailData, onlineData, notification, loading, query } = this.state;
    const { navigation } = this.props;
    if (onlineData) {
      return (
        <Results
          onlineData={onlineData}
          retailData={retailData}
          navigation={navigation}
          notification={notification}
          getMoreProducts={this.getMoreProducts}
          loading={loading}
          openProduct={this.openProduct}
          query={query}
        />
      );
    } else {
      return <Text>Loading</Text>;
    }
  }
  async getMoreProducts() {
    // const {hasNextPage,query,products,cursor} = this.state;
    // if(this.state.hasNextPage){
    //   try{
    //     this.setState({loading:true})
    //     const { data: { shop: { products: data } } } = await client.query({
    //       query: findProducts,
    //       variables: { query, cursor }
    //     });
    //     const newCursor = this.getCursor(data.edges)
    //     let newProducts = products.concat(data.edges)
    //     this.setState({
    //       products: newProducts,
    //       hasNextPage:data.pageInfo.hasNextPage,
    //       cursor:newCursor,
    //       loading:false
    //     });
    //   }catch(e){
    //     console.log(`Results Controller Error: ${e}`);
    //     this.setState({loading:false})
    //   }
    // }else{
    //   this.setState({notification:`Sorry, I can't find any other ideas for ${query}.`})
    // }
  }

  async openProduct(productData) {
    try {
      const shopify = new ShopifyQuery();
      const metafields = await shopify.getMetafields(productData.id);
      const data = { ...productData, metafields };
      // const response = await fetch(url);
      // const metadata = await response.json();
      // const data = {...productData,metadata}
      // console.log(JSON.stringify(data))
      this.props.navigation.navigate({
        routeName: "Product",
        params: {
          product: data,
          type: productData.type
        }
      });
    } catch (e) {
      console.log(e);
    }
    //myshopify.com/admin/products/1184851781/metafields.json
  }
}
