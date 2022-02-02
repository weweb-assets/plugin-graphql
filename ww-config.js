export default {
    editor: {
        collection: {
            edit: () => import('./src/components/CollectionEdit.vue'),
            summary: () => import('./src/components/CollectionSummary.vue'),
            getIsValid(config) {
                return !!config.url && !!config.query;
            },
        },
    },
    functions: [
        {
            name: 'GraphQL Request',
            code: 'graphqlRequest',
            parameters: [
                { name: 'url', type: 'string' },
                { name: 'query', type: 'string' },
                { name: 'variables', type: 'array', optional: true },
                { name: 'headers', type: 'array', optional: true },
            ],
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/GraphqlRequest.vue'),
            getIsValid([url, query]) {
                return !!url && !!query;
            },
            /* wwEditor:end */
        },
    ],
};
