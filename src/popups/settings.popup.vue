<template>
    <div class="ww-popup-graphql-settings">
        <div class="graphql-settings__properties" @click="next('GRAPHQL_SYNCHRONIZATION_POPUP')">
            <wwEditorIcon class="graphql-settings__properties-icon -left" name="download" />
            <div class="graphql-settings__properties-name paragraph-s">Synchronisation</div>
            <wwEditorIcon class="graphql-settings__properties-icon -right" name="chevron-forward" />
        </div>
        <div class="graphql-settings__properties" @click="next('GRAPHQL_WEBHOOKS_POPUP')">
            <wwEditorIcon class="graphql-settings__properties-icon -left" name="copy-paste" />
            <div class="graphql-settings__properties-name paragraph-s">Webhooks</div>
            <wwEditorIcon class="graphql-settings__properties-icon -right" name="chevron-forward" />
        </div>
        <div class="graphql-settings__properties" @click="next('GRAPHQL_QUERIES_POPUP')">
            <wwEditorIcon class="graphql-settings__properties-icon -left" name="bind" />
            <div class="graphql-settings__properties-name paragraph-s">Queries</div>
            <wwEditorIcon class="graphql-settings__properties-icon -right" name="chevron-forward" />
        </div>
        <a class="graphql-settings__properties" href="//developer.weweb.io/" target="_blank">
            <wwEditorIcon class="graphql-settings__properties-icon -left" name="comment" />
            <div class="graphql-settings__properties-name paragraph-s">Documentation</div>
            <wwEditorIcon class="graphql-settings__properties-icon -right" name="chevron-forward" />
        </a>
        <div class="graphql-settings__delete-zone danger-zone">
            <span class="graphql-settings__delete-zone-label">DANGER ZONE</span>
            <button
                class="graphql-settings__delete-zone-button ww-editor-button -primary -red -small"
                @click="deletePlugin"
            >
                Delete plugin
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SettingsPopup',
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
            pluginId: undefined,
            settings: {},
        };
    },
    methods: {
        next(popup) {
            this.$emit('next', popup);
        },
        async deletePlugin() {
            const confirm = await wwLib.wwModals.open({
                title: {
                    en: 'Delete plugin GraphQL?',
                    fr: 'Supprimer le plugin GraphQL ?',
                },
                text: {
                    en: 'Are you sure you want to delete the plugin from your website?',
                    fr: 'Voulez-vous vraiment supprimer le plugin de votre site ?',
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
            await wwLib.wwPlugin.deleteDesignPlugin(this.pluginId);
        },
    },
    created() {
        this.pluginId = this.options.data.pluginId;
        this.settings = this.options.data.settings;
    },
};
</script>

<style scoped lang="scss">
.ww-popup-graphql-settings {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: var(--ww-spacing-03) 0;
    .graphql-settings {
        &__input {
            margin-bottom: var(--ww-spacing-03);
        }
        &__row {
            display: flex;
            align-items: center;
        }
        &__delete-zone {
            margin-top: auto;
            &-label {
                width: 100%;
                font-size: var(--ww-font-size-04);
                color: var(--ww-color-red-500);
            }
            &-button {
                margin-top: var(--ww-spacing-02);
                margin-right: var(--ww-spacing-02);
            }
        }
        &__properties {
            display: flex;
            align-items: center;
            padding: var(--ww-spacing-02) 0;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: var(--ww-border-radius-02);
            margin-bottom: var(--ww-spacing-01);
            &-name {
                margin-left: var(--ww-spacing-01);
            }

            &-content {
                margin-left: auto;
                color: var(--ww-color-dark-400);
            }
            &-icon {
                &.-left {
                    margin-right: var(--ww-spacing-01);
                }
                &.-right {
                    margin-left: auto;
                    margin-right: var(--ww-spacing-01);
                }
            }
            &:hover {
                background-color: var(--ww-color-dark-200);
            }
        }
    }
}
</style>
