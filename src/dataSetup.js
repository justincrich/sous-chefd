import { HttpLink, InMemoryCache } from 'apollo-client-preset'
import { ApolloClient } from 'apollo-client';
import {ApolloLink,concat} from 'apollo-link';
export default function getClient(instance,token){
    // return new Promise((res,rej)=>{
        const httpLink = new HttpLink({ uri: `https://${instance}.myshopify.com/api/graphql` });
        const authMiddleware = new ApolloLink((operation,forward)=>{
            operation.setContext({
                headers:{
                    "X-Shopify-Storefront-Access-Token":token
                }
            });

            return forward(operation)
        })

        const client = new ApolloClient({
            link:concat(authMiddleware,httpLink),
            cache:new InMemoryCache().restore({})
        })

        return client;
    // });
}