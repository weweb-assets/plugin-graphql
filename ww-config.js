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
    actions: [
        {
            name: 'GraphQL Request',
            code: 'graphqlRequest',
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
