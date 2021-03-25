<template>
    <div class="ww-popup-graphql-queries">
        <button class="graphql-queries__all ww-editor-button -primary" @click="addQuery">Add query</button>
        <div class="graphql-queries__row" v-for="(query, index) in settings.privateData.queries" :key="index">
            <div class="paragraph-m">{{ query.name || query.url }}</div>
            <button class="ww-editor-button -secondary -small m-auto-left" @click="editQuery(index, query)">Edit</button>
            <div class="graphql-queries__button-delete m-left" @click="deleteQuery(index)">
                <wwEditorIcon name="delete" small />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QueriesPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    data() {
        return {
            settings: {
                privateData: {},
            },
        };
    },
    watch: {
        isSetup() {
            this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
        },
    },
    computed: {
        isSetup() {
            return this.settings.privateData.queries && this.settings.privateData.queries.length;
        },
    },
    methods: {
        async addQuery() {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'GRAPHQL_ADD_QUERY_POPUP',
                });
                this.settings.privateData.queries.push(result.query);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async editQuery(index, query) {
            try {
                const result = await wwLib.wwPopups.open({
                    firstPage: 'GRAPHQL_EDIT_QUERY_POPUP',
                    data: { query },
                });
                this.settings.privateData.queries.splice(index, 1, result.query);
            } catch (err) {
                wwLib.wwLog.error(err);
            }
        },
        async deleteQuery(index) {
            const confirm = await wwLib.wwModals.open({
                title: {
                    en: 'Delete data source?',
                    fr: 'Supprimer la source de données?',
                },
                text: {
                    en:
                        'Are you sure you want to delete this data source? All elements binded to this data source will be unbind.',
                    fr:
                        'Voulez-vous vraiment supprimer la source de données ? Tous les éléments liés à cette source de données seront dissociés.',
                },
                buttons: [
                    {
                        text: {
                            en: 'Cancel',
                            fr: 'Annuler',
                        },
                        color: '-secondary',
                        value: false,
                        escape: true,
                    },
                    {
                        text: {
                            en: 'Delete',
                            fr: 'Supprimer',
                        },
                        color: '-primary -red',
                        value: true,
                        enter: true,
                    },
                ],
            });
            if (!confirm) return;
            this.settings.privateData.queries.splice(index, 1);
        },
        async beforeNext() {
            this.options.setLoadingStatus(true);
            try {
                const plugin = wwLib.wwPlugins.pluginGraphql;
                plugin.settings = await wwLib.wwPlugin.saveSettings(
                    plugin.id,
                    plugin.settings.id,
                    this.settings.data,
                    this.settings.privateData
                );

                const oldQueries = this.options.data.settings.privateData.queries;
                const newQueries = this.options.result.settings.privateData.queries;
                const deletedQueries = oldQueries.filter(query => !newQueries.find(elem => elem.id === query.id));
                deletedQueries.forEach(query => wwLib.wwPlugin.deleteCmsDataSet(query.id));

                wwLib.wwPlugins.pluginGraphql.settings = plugin.settings;
                this.options.data.settings = plugin.settings;
            } catch (err) {
                wwLib.wwLog.error(err);
            }
            this.options.setLoadingStatus(false);
        },
    },
    created() {
        this.settings = _.cloneDeep(this.options.data.settings || this.settings);
        this.options.result.settings = this.settings;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-graphql-queries {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .graphql-queries {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
        }
        &__button-delete {
            margin: 0 var(--ww-spacing-03);
            cursor: pointer;
            transition: color 0.3s ease;
            &:hover {
                color: var(--ww-color-red-500);
            }
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-left {
        margin-left: var(--ww-spacing-03);
    }
}
</style>
