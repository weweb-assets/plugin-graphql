import settingsPopup from './settings.popup.vue';
import queriesPopup from './queries.popup.vue';
import queryPopup from './query.popup.vue';
import synchronizationPopup from './synchronization.popup.vue';
import webhooksPopup from './webhooks.popup.vue';

wwLib.wwPopups.addPopup('graphqlSettingsPopup', settingsPopup);
wwLib.wwPopups.addPopup('graphqlQueriesPopup', queriesPopup);
wwLib.wwPopups.addPopup('graphqlQueryPopup', queryPopup);
wwLib.wwPopups.addPopup('graphqlSynchronizationPopup', synchronizationPopup);
wwLib.wwPopups.addPopup('graphqlWebhooksPopup', webhooksPopup);

wwLib.wwPopups.addStory('GRAPHQL_POPUP', {
    title: {
        en: 'GraphQL',
        fr: 'GraphQL',
    },
    type: 'graphqlSettingsPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
});

wwLib.wwPopups.addStory('GRAPHQL_QUERIES_POPUP', {
    title: {
        en: 'GraphQL - Queries',
        fr: 'GraphQL - Queries',
    },
    type: 'graphqlQueriesPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Save queries',
                fr: 'Enregistrer les queries',
            },
            next: 'GRAPHQL_SYNCHRONIZATION_POPUP',
        },
    },
});

wwLib.wwPopups.addStory('GRAPHQL_ADD_QUERY_POPUP', {
    title: {
        en: 'GraphQL - Add query',
        fr: 'GraphQL - Ajouter une query',
    },
    type: 'graphqlQueryPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Add query',
                fr: 'Ajouter une query',
            },
        },
    },
});

wwLib.wwPopups.addStory('GRAPHQL_EDIT_QUERY_POPUP', {
    title: {
        en: 'GraphQL - Edit query',
        fr: "GraphQL - Editer la query",
    },
    type: 'graphqlQueryPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        SAVE: {
            text: {
                en: 'Edit query',
                fr: "Editer la query",
            },
        },
    },
});

wwLib.wwPopups.addStory('GRAPHQL_WEBHOOKS_POPUP', {
    title: {
        en: 'GraphQL - Webhooks',
        fr: 'GraphQL - Webhooks',
    },
    type: 'graphqlWebhooksPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});

wwLib.wwPopups.addStory('GRAPHQL_SYNCHRONIZATION_POPUP', {
    title: {
        en: 'GraphQL - Synchronization',
        fr: 'GraphQL - Synchronization',
    },
    type: 'graphqlSynchronizationPopup',
    size: wwLib.wwPopups.SIZES.MEDIUM,
    buttons: {
        DONE: {
            text: {
                en: 'Done',
                fr: 'Done',
            },
        },
    },
});
