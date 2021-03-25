<template>
    <div class="ww-popup-graphql-query">
        <label class="graphql-query__label caption-s" for="url-graphql">
            Url
            <div class="graphql-query__label-required">required</div>
        </label>
        <input
            type="text"
            name="url-graphql"
            class="graphql-query__input -full caption-m ww-editor-input -large"
            placeholder="https://api-url.com/graphql"
            v-model="query.url"
            autofocus
        />
        <label class="graphql-query__label caption-s" for="name-graphql">
            Name
            <div class="graphql-query__label-required">required</div>
        </label>
        <input
            type="text"
            name="name-graphql"
            class="graphql-query__input -full caption-m ww-editor-input -large"
            placeholder="My query"
            v-model="query.name"
        />
        <label class="graphql-query__label caption-s" for="query-graphql">
            Query
            <div class="graphql-query__label-required">required</div>
        </label>
        <textarea
            name="query-graphql"
            class="graphql-query__input -full caption-m ww-editor-input -textarea -large"
            rows="11"
            :placeholder="`query MyQuery {
    posts {
        nodes {
            title
        }
    }
}`"
            v-model="query.query"
        />
        <label class="graphql-query__label caption-s" for="display-by-graphql">
            Display by
            <div class="graphql-query__label-required">optional</div>
        </label>
        <input
            type="text"
            name="display-by-graphql"
            class="graphql-query__input -full caption-m ww-editor-input -large"
            placeholder="name"
            v-model="query.displayBy"
        />
        <div class="graphql-query__row graphql-query__input">
            <label class="graphql-query__label caption-s" for="graphql-variables"> Variables </label>
            <button class="ww-editor-button -primary -small m-auto-left" @click="addVariable" :disabled="!query.url">
                Add variable field
            </button>
        </div>
        <div class="graphql-query__row -space-between" v-for="(variable, index) of query.variables" :key="index">
            <div class="graphql-query__row-item">
                <input
                    type="text"
                    class="graphql-query__input caption-m ww-editor-input"
                    placeholder="Key"
                    v-model="variable.key"
                />
            </div>
            <div class="graphql-query__row-item">
                <input
                    type="text"
                    class="graphql-query__input caption-m ww-editor-input"
                    placeholder="value"
                    v-model="variable.value"
                />
            </div>
            <div class="graphql-query__input graphql-query__button-delete" @click="deleteVariable(index)">
                <wwEditorIcon name="delete" small />
            </div>
        </div>
        <div class="graphql-query__row graphql-query__input">
            <label class="graphql-query__label caption-s" for="graphql-headers"> Headers </label>
            <button class="ww-editor-button -primary -small m-auto-left" @click="addHeader" :disabled="!query.url">
                Add header field
            </button>
        </div>
        <div class="graphql-query__row -space-between" v-for="(header, index) of query.headers" :key="index">
            <div class="graphql-query__row-item">
                <input
                    type="text"
                    class="graphql-query__input caption-m ww-editor-input"
                    placeholder="Key"
                    v-model="header.key"
                />
            </div>
            <div class="graphql-query__row-item">
                <input
                    type="text"
                    class="graphql-query__input caption-m ww-editor-input"
                    placeholder="value"
                    v-model="header.value"
                />
            </div>
            <div class="graphql-query__input graphql-query__button-delete" @click="deleteHeader(index)">
                <wwEditorIcon name="delete" small />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QueryPopup',
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
            query: {
                id: wwLib.wwUtils.getUid(),
                url: undefined,
                query: undefined,
                name: undefined,
                displayBy: undefined,
                headers: [],
                variables: [],
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
            return (
                !!this.query.url &&
                !!this.query.url.length &&
                !!this.query.name &&
                !!this.query.name.length &&
                !!this.query.query &&
                !!this.query.query.length
            );
        },
    },
    methods: {
        addHeader() {
            this.query.headers.push({ key: '', value: '' });
        },
        deleteHeader(index) {
            this.query.headers.splice(index, 1);
        },
        addVariable() {
            this.query.variables.push({ key: '', value: '' });
        },
        deleteVariable(index) {
            this.query.variables.splice(index, 1);
        },
    },
    created() {
        this.query = this.options.data.query || this.query;
        this.options.result.query = this.query;
        this.options.setButtonState('SAVE', this.isSetup ? 'ok' : 'disabled');
    },
};
</script>

<style scoped lang="scss">
.ww-popup-graphql-query {
    position: relative;
    padding: var(--ww-spacing-03) 0;
    .graphql-query {
        &__label {
            display: flex;
            align-items: center;
            font-weight: 500;
            color: var(--ww-color-dark-500);
            margin-bottom: var(--ww-spacing-01);
            &-required {
                margin-left: auto;
                color: var(--ww-color-dark-400);
            }
        }
        &__link {
            color: var(--ww-color-blue-500);
            margin-left: var(--ww-spacing-02);
        }
        &__input {
            margin-bottom: var(--ww-spacing-03);
            &.-full {
                width: 100%;
            }
        }
        &__select {
            min-width: 65px;
            margin-left: var(--ww-spacing-02);
        }
        &__row {
            display: flex;
            align-items: center;
            width: 100%;
            &.-space-between {
                justify-content: space-between;
            }
            &-item {
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-right: var(--ww-spacing-02);
                &:last-child {
                    margin-right: 0;
                    margin-left: var(--ww-spacing-02);
                }
            }
        }
        &__button-delete {
            margin-right: var(--ww-spacing-03);
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
}
</style>
