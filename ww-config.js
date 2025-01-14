export default {
    features: {
        datasource: true,
    },
    editor: {
        collection: {
            edit: () => import('./src/components/CollectionEdit.vue'),
            summary: () => import('./src/components/CollectionSummary.vue'),
            getIsValid(config) {
                return !!config.url && !!config.query;
            },
        },
    },
    actions: [
        {
            name: 'GraphQL Request',
            code: 'graphqlRequest',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/GraphqlRequest.vue'),
            getIsValid({ url, query }) {
                return !!url && !!query;
            },
            copilot: {
                description: 'Make a GraphQL request to fetch data from a GraphQL API endpoint',
                returns: 'object',
                schema: {
                    url: {
                        type: 'string',
                        description: 'The GraphQL API endpoint URL',
                        bindable: true
                    },
                    query: {
                        type: 'string',
                        description: 'The GraphQL query to execute',
                        bindable: true
                    },
                    variables: {
                        type: 'array',
                        description: 'Array of key-value pairs for GraphQL variables',
                        bindable: true,
                        items: {
                            key: {
                                type: 'string',
                                description: 'Variable name'
                            },
                            value: {
                                type: 'any',
                                description: 'Variable value'
                            }
                        }
                    },
                    headers: {
                        type: 'array',
                        description: 'Array of HTTP headers to include in the request',
                        bindable: true,
                        items: {
                            key: {
                                type: 'string',
                                description: 'Header name'
                            },
                            value: {
                                type: 'string',
                                description: 'Header value'
                            }
                        }
                    },
                    isWithCredentials: {
                        type: 'boolean',
                        description: 'Whether to include credentials in the request',
                        bindable: true
                    },
                    isFullResponse: {
                        type: 'boolean',
                        description: 'Whether to return the full response or just the data property',
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
    ],
};