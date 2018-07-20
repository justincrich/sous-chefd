import React from "react";
import { Font } from "expo";
import { StyleSheet, Text, View } from "react-native";
import Home from "/components/views/home.js";
import environment from "/env/getEnv.js";
import ShopifyQuery from "../resources/shopifyFetcher.js";
export default class HomeController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searching: false,
      notification: ""
    };
    this.search = this.search.bind(this);
  }

  async search(query = " ") {
    const { navigation: { navigate } } = this.props;

    //console.log(query)

    this.setState(({ searching }) => {
      !searching;
    });
    try {
      // console.log(environment)
      //const {SHOPIFY_INSTANCE, SHOPIFY_ADMIN_TOKEN,COLLECTION_PRODUCTS,SHOPIFY_TOKEN,SHOPIFY_PASSWORD,SHOPIFY_KEY} = environment;
      // const url =
      //    "https://"+SHOPIFY_KEY+":"+SHOPIFY_PASSWORD+"@"+SHOPIFY_INSTANCE +".myshopify.com/admin/products.json?limit=10&collection_id="+COLLECTION_PRODUCTS+"&title=" +query;
      // const address = "https://chefd-staging.myshopify.com/admin/products.json?limit=10&collection_id="+COLLECTION_PRODUCTS+"&title=" +query;
      // const data = await fetch(address,{
      //   credentials:'same-origin',
      //   method:'GET',
      //   headers:{
      // 'content-type': 'application/json',
      //   'Authorization':'Basic '+SHOPIFY_TOKEN
      //   }
      // });

      // const res = await data.json();

      // const {products} = res;

      const shopify = new ShopifyQuery();
      const onlineData = await shopify.getOnlineProducts(query);
      const retailData = await shopify.getRetailProducts(query);
      // const shopifyQuery = {
      //   query:''environment.STOREFRONT_RETAIL,

      // }
      // const retailProducts = await this.client.product.fetchQuery(shopifyQuery);
      // console.log(retailProducts)

      if (onlineData && onlineData.length > 0) {
        navigate({
          routeName: "Results",
          params: {
            data: {
              onlineData,
              retailData
            },
            query
          }
        });
      } else {
        this.setState({
          notification: `I couldn't find any ideas for ${query.toLowerCase()}`
        });
      }
    } catch (e) {
      console.error(e);
      this.setState({
        notification: "Something went wrong. Contact customer support."
      });
    } finally {
      this.setState(({ searching }) => {
        !searching;
      });
    }
  }

  render() {
    const { notification } = this.state;
    return <Home search={this.search} notification={notification} />;
  }
}
// let products = get5Products();
// // export default graphql(get5Products)(graphql(all)(HomeController));
// export default withApollo(HomeController);

// export default graphql(findProducts, {
//   skip: true
// })(withApollo(HomeController));

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// const ConvoListViewWrapper = graphql(deleteConversation, {
//   name: "deleteConversation"
// })(
//   graphql(deleteMessage, { name: "deleteMessage" })(
//     graphql(getAllConvoMsgs, {
//       name: "getAllConvoMsgs",
//       options: { variables: { conversation: "" } }
//     })(
//       graphql(getConvos, {
//         options: props => ({
//           variables: {
//             userID: props.userID
//           }
//         })
//       })(withApollo(withRouter(ConvoListView)))
//     )
//   )
// );
