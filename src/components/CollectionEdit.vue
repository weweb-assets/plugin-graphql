<template>
    <div class="graphql-collection-edit">
        <wwEditorFormRow label="Url" required>
            <wwEditorInputText
                type="text"
                name="url"
                :model-value="query.url"
                placeholder="https://api-url.com/graphql"
                large
                @update:modelValue="setProp('url', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Query" required>
            <wwEditorInputCode
                name="query"
                :model-value="query.query"
                large
                language="graphql"
                @update:modelValue="setProp('query', $event)"
            />
        </wwEditorFormRow>
        <wwEditorFormRow label="Variables">
            <template #append-label>
                <button
                    type="button"
                    class="ww-editor-button -primary -small m-auto-left m-bottom"
                    @click="addElem('variables')"
                >
                    Add variable field
                </button>
            </template>
            <div
                v-for="(variable, index) in query.variables"
                :key="index"
                class="graphql-collection-edit__row -space-between m-bottom"
            >
                <wwEditorInputText
                    type="text"
                    :model-value="variable.key"
                    placeholder="Key"
                    @update:modelValue="setElemProp('variables', index, { key: $event })"
                />
                <wwEditorInputText
                    type="text"
                    :model-value="variable.value"
                    placeholder="Value"
                    @update:modelValue="setElemProp('variables', index, { value: $event })"
                />
                <button
                    type="button"
                    class="ww-editor-button -tertiary -small -icon -red"
                    @click="deleteElem('variables', index)"
                >
                    <wwEditorIcon class="ww-editor-button-icon" name="delete" small />
                </button>
            </div>
        </wwEditorFormRow>
        <wwEditorFormRow label="Headers">
            <template #append-label>
                <button
                    type="button"
                    class="ww-editor-button -primary -small m-auto-left m-bottom"
                    @click="addElem('headers')"
                >
                    Add header field
                </button>
            </template>
            <div
                v-for="(header, index) in query.headers"
                :key="index"
                class="graphql-collection-edit__row -space-between m-bottom"
            >
                <wwEditorInputText
                    type="text"
                    :model-value="header.key"
                    placeholder="Key"
                    @update:modelValue="setElemProp('headers', index, { key: $event })"
                />
                <wwEditorInputText
                    type="text"
                    :model-value="header.value"
                    placeholder="Value"
                    @update:modelValue="setElemProp('headers', index, { value: $event })"
                />
                <button
                    type="button"
                    class="ww-editor-button -tertiary -small -icon -red"
                    @click="deleteElem('headers', index)"
                >
                    <wwEditorIcon class="ww-editor-button-icon" name="delete" small />
                </button>
            </div>
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
    },
    emits: ['update:config'],
    computed: {
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
            this.$emit('update:config', { ...this.query, [key]: value });
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
