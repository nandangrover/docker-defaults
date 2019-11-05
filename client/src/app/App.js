import React from 'react';
import Store from './Store';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import TestComponent from '../features/Test/TestComponent';

const client = new ApolloClient({
    uri: `http://${window.location.hostname}/api/graphql`,
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <Provider store={Store}>
                <div>
                    <TestComponent />
                </div>
            </Provider>
        </ApolloProvider>
    );
};

export default App;
