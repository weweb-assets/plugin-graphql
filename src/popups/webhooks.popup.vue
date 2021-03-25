<template>
    <div class="ww-popup-graphql-webhooks">
        <div class="graphql-webhooks__row" v-for="(query, index) in settings.privateData.queries" :key="index">
            <div class="paragraph-m">{{ query.name || query.url }}</div>
            <button class="ww-editor-button -primary -green -small m-auto-left" @click="copyUrl(query)">
                <wwEditorIcon class="ww-editor-button-icon -left" name="copy-paste" small />
                Copy url
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WebhooksPopup',
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
    methods: {
        async copyUrl(query) {
            const designId = wwLib.wwWebsiteData.getInfo().id;
            await wwLib
                .getManagerWindow()
                .navigator.clipboard.writeText(
                    `https://data.weweb.io/designs/${designId}/cms_data_set/${query.id}/callback`
                );
            wwLib.wwNotification.open({
                text: {
                    en: 'Url copied to clipboard',
                },
                color: 'green',
            });
        },
    },
    created() {
        this.settings = this.options.data.settings;
    },
};
</script>

<style scoped lang="scss">
.ww-popup-graphql-webhooks {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .graphql-webhooks {
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
