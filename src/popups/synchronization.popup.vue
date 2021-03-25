<template>
    <div class="ww-popup-graphql-sync">
        <button class="graphql-sync__all ww-editor-button -primary -green" @click="syncAll" :disabled="isFetching">
            <div v-if="!isFetching">Synchronize all</div>
            <div v-else>Fetching...</div>
        </button>
        <div class="graphql-sync__row" v-for="(query, index) in settings.privateData.queries" :key="index">
            <div class="paragraph-m">{{ query.name || query.url }}</div>
            <div class="caption-m m-auto-left">
                <template v-if="!isQueryFetching(query)">
                    <template v-if="getSource(query).lastSyncDate">
                        {{ getSource(query).lastSyncDate | dateFromNow }}
                    </template>
                    <template v-else>never synchronized</template>
                </template>
            </div>
            <button
                :disabled="isQueryFetching(query)"
                class="ww-editor-button -primary -green -small m-left"
                @click="sync(query)"
            >
                <div v-if="!isQueryFetching(query)">Synchronize query</div>
                <div v-else>Fetching...</div>
            </button>
        </div>
        <div class="graphql-sync__separator"></div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    name: 'SynchronizationPopup',
    props: {
        options: {
            type: Object,
            default() {
                return {};
            },
        },
    },
    filters: {
        dateFromNow(date) {
            return moment(date).fromNow();
        },
    },
    data() {
        return {
            isFetching: false,
            queriesFetching: [],
            settings: {
                privateData: {},
            },
        };
    },
    methods: {
        getSource(query) {
            return wwLib.$store.getters['cms/getData'][query.id] || {};
        },
        isQueryFetching(query) {
            return this.queriesFetching.indexOf(query.id) !== -1;
        },
        queryFetching(query, value) {
            if (value) {
                this.queriesFetching.push(query.id);
            } else {
                const index = this.queriesFetching.indexOf(query.id);
                if (index !== -1) this.queriesFetching.splice(index, 1);
            }
        },
        async sync(query) {
            this.queryFetching(query, true);
            await wwLib.wwPlugins.pluginGraphql.sync(query);
            this.queryFetching(query, false);
        },
        async syncAll() {
            this.isFetching = true;
            for (const query of this.settings.privateData.queries) await this.sync(query);
            this.isFetching = false;
        },
    },
    created() {
        this.settings = this.options.data.settings;
    },
    mounted() {
        if (this.options.data.isFirstTime) this.syncAll();
    },
};
</script>

<style scoped lang="scss">
.ww-popup-graphql-sync {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .graphql-sync {
        &__all {
            margin: 0 auto var(--ww-spacing-02) auto;
        }
        &__row {
            display: flex;
            align-items: center;
            margin-bottom: var(--ww-spacing-04);
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-left {
        margin-left: var(--ww-spacing-02);
    }
}
</style>
