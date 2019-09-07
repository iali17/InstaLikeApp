import App from '../components/App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';

global.fetch = require('node-fetch');

export default function Blog() {
    return(
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    )
}