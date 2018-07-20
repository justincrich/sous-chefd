import environment from "/env/getEnv.js";
import _ from "lodash";
export default class ShopifyQuery {
  constructor() {
    this.SHOPIFY_INSTANCE = environment.SHOPIFY_INSTANCE;
    this.COLLECTION_PRODUCTS = environment.COLLECTION_PRODUCTS;
    this.SHOPIFY_TOKEN = environment.SHOPIFY_TOKEN;
    this.COLLECTION_RETAIL = environment.COLLECTION_RETAIL;
  }

  async getOnlineProducts(query) {
    const url =
      "https://" +
      this.SHOPIFY_INSTANCE +
      ".myshopify.com/admin/products.json?limit=10&collection_id=" +
      this.COLLECTION_PRODUCTS +
      "&title=" +
      query;
    try {
      const data = await fetch(url, {
        credentials: "same-origin",
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic " + this.SHOPIFY_TOKEN
        }
      });
      const res = await data.json();
      return res.products;
    } catch (e) {
      console.log(e);
    }
  }

  async getRetailProducts(query) {
    const url =
      "https://" +
      this.SHOPIFY_INSTANCE +
      ".myshopify.com/admin/products.json?limit=10&collection_id=" +
      this.COLLECTION_RETAIL +
      "&title=" +
      query;
    try {
      const data = await fetch(url, {
        credentials: "same-origin",
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic " + this.SHOPIFY_TOKEN
        }
      });
      const res = await data.json();
      return res.products;
    } catch (e) {
      console.log(e);
    }
  }
  async getMetafields(id) {
    const url =
      "https://" +
      this.SHOPIFY_INSTANCE +
      ".myshopify.com/" +
      "admin/products/" +
      id +
      "/metafields.json";
    try {
      const data = await fetch(url, {
        credentials: "same-origin",
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: "Basic " + this.SHOPIFY_TOKEN
        }
      });
      const res = await data.json();
      return _.keyBy(res.metafields, o => o.key);
    } catch (e) {
      console.log(e);
    }
  }
}
