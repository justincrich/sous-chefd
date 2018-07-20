import gql from 'graphql-tag'

function get5Products(){
    return gql`{
        shop {
          products(first: 10) {
            edges {
              
              node {
      
                images(
                  first:1,
                  maxWidth:400,
                  scale:1,
                  crop:CENTER
                ){
                  edges{
                    node{
                      id
                      originalSrc
                      transformedSrc
                      altText
                      
                    }
                  }
                }
                handle
                onlineStoreUrl
                descriptionHtml
                options(first:3){
                  name
                  values
                  id
                }
                variants(first:3){
                  edges{
                    node{
                      availableForSale
                      price
                      title
                    }
                  }
                }
                vendor
                title
                id
                description
                createdAt
                tags
                productType
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }`
}

const findProducts = gql`

    query($query:String!,$cursor:String){
      shop {
        collections(first:1,query:){
          edges{
            node{
              title
              id
              products(first: 10,query:$query,after:$cursor) {
                edges {
                  cursor
                  node {
          
                    images(
                      first:1,
                      maxWidth:400,
                      scale:1,
                      crop:CENTER
                    ){
                      edges{
                        node{
                          id
                          originalSrc
                          transformedSrc
                          altText
                          
                        }
                      }
                    }
                    handle
                    onlineStoreUrl
                    descriptionHtml
                    options(first:3){
                      name
                      values
                      id
                    }
                    variants(first:3){
                      edges{
                        node{
                          availableForSale
                          price
                          title
                        }
                      }
                    }
                    vendor
                    title
                    id
                    description
                    createdAt
                    tags
                    productType
                    publishedAt
                    updatedAt
                  }
                }
                pageInfo {
                  hasNextPage
                }
              }
            }
          }
        }
      }
    }`

export {
    get5Products,
    findProducts
}