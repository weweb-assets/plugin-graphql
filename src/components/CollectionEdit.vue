<template>
    <div class="graphql-collection-edit">
        <wwEditorFormRow label="Url" required>
            <wwEditorFormInput
                type="text"
                name="url"
                :value="query.url"
                @input="setProp('url', $event)"
                placeholder="https://api-url.com/graphql"
                v-on:keyup.native.enter="$emit('next')"
                large
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Query" required>
            <wwCodeEditor
                name="query"
                :value="query.query"
                @input="setProp('query', $event)"
                large
                language="graphql"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Variables">
            <template slot="append-label">
                <button class="ww-editor-button -primary -small m-auto-left m-bottom" @click="addElem('variables')">
                    Add variable field
                </button>
            </template>
            <div
                class="graphql-collection-edit__row -space-between m-bottom"
                v-for="(variable, index) in query.variables"
                :key="index"
            >
                <wwEditorFormInput
                    type="text"
                    :value="variable.key"
                    @input="setElemProp('variables', index, { key: $event })"
                    placeholder="Key"
                    v-on:keyup.native.enter="$emit('next')"
                />
                <wwEditorFormInput
                    type="text"
                    :value="variable.value"
                    @input="setElemProp('variables', index, { value: $event })"
                    placeholder="Value"
                    v-on:keyup.native.enter="$emit('next')"
                />
                <button class="ww-editor-button -tertiary -small -icon -red" @click="deleteElem('variables', index)">
                    <wwEditorIcon class="ww-editor-button-icon" name="delete" small />
                </button>
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="Headers">
            <template slot="append-label">
                <button class="ww-editor-button -primary -small m-auto-left m-bottom" @click="addElem('headers')">
                    Add header field
                </button>
            </template>
            <div
                class="graphql-collection-edit__row -space-between m-bottom"
                v-for="(header, index) in query.headers"
                :key="index"
            >
                <wwEditorFormInput
                    type="text"
                    :value="header.key"
                    @input="setElemProp('headers', index, { key: $event })"
                    placeholder="Key"
                    v-on:keyup.native.enter="$emit('next')"
                />
                <wwEditorFormInput
                    type="text"
                    :value="header.value"
                    @input="setElemProp('headers', index, { value: $event })"
                    placeholder="Value"
                    v-on:keyup.native.enter="$emit('next')"
                />
                <button class="ww-editor-button -tertiary -small -icon -red" @click="deleteElem('headers', index)">
                    <wwEditorIcon class="ww-editor-button-icon" name="delete" small />
                </button>
            </div>
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        config: { type: Object, required: true },
    },
    watch: {
        isSetup: {
            immediate: true,
            handler(value) {
                this.$emit('update-is-valid', value);
            },
        },
    },
    computed: {
        isSetup() {
            return !!this.query.url && !!this.query.query;
        },
        query() {
            return {
                url: undefined,
                query: `query MyQuery {
    posts {
        nodes {
            title
        }
    }
}`,
                headers: [],
                variables: [],
                ...this.config,
            };
        },
    },
    methods: {
        addElem(key) {
            const array = _.cloneDeep(this.query[key] || []);
            array.push({ key: '', value: '' });
            this.setProp(key, array);
        },
        setElemProp(key, index, value) {
            const array = _.cloneDeep(this.query[key] || []);
            array.splice(index, 1, { ...array[index], ...value });
            this.setProp(key, array);
        },
        deleteElem(key, index) {
            const array = _.cloneDeep(this.query[key] || []);
            array.splice(index, 1);
            this.setProp(key, array);
        },
        setProp(key, value) {
            this.$emit('update-config', { ...this.query, [key]: value });
        },
    },
};
</script>

<style scoped lang="scss">
.graphql-collection-edit {
    display: flex;
    flex-direction: column;
    &__row {
        display: flex;
        align-items: center;
        > *:not(:first-child) {
            margin-left: var(--ww-spacing-02);
        }
        &.-space-between {
            justify-content: space-between;
        }
    }
    .m-auto-left {
        margin-left: auto;
    }
    .m-bottom {
        margin-bottom: var(--ww-spacing-02);
    }
}
</style>
