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
        <wwEditorInputRow
            type="array"
            :model-value="query.variables"
            label="Variables"
            bindable
            @update:modelValue="setProp('variables', $event)"
            @add-item="addElem('variables')"
        >
            <template #default="{ item, setItem }">
                <wwEditorInputRow
                    type="query"
                    :model-value="item.key"
                    label="Key"
                    placeholder="Enter a value"
                    bindable
                    small
                    @update:modelValue="setItem({ ...item, key: $event })"
                />
                <wwEditorInputRow
                    type="query"
                    :model-value="item.value"
                    label="Value"
                    placeholder="Enter a value"
                    bindable
                    small
                    @update:modelValue="setItem({ ...item, value: $event })"
                />
            </template>
        </wwEditorInputRow>
        <wwEditorInputRow
            type="array"
            :model-value="query.headers"
            label="Headers"
            bindable
            @update:modelValue="setProp('headers', $event)"
            @add-item="addElem('headers')"
        >
            <template #default="{ item, setItem }">
                <wwEditorInputRow
                    type="query"
                    :model-value="item.key"
                    label="Key"
                    placeholder="Enter a value"
                    bindable
                    small
                    @update:modelValue="setItem({ ...item, key: $event })"
                />
                <wwEditorInputRow
                    type="query"
                    :model-value="item.value"
                    label="Value"
                    placeholder="Enter a value"
                    bindable
                    small
                    @update:modelValue="setItem({ ...item, value: $event })"
                />
            </template>
        </wwEditorInputRow>
        <wwEditorFormRow label="Result key">
            <wwEditorInputText
                type="text"
                :model-value="query.resultKey"
                placeholder="result.key"
                small
                @update:modelValue="setProp('resultKey', $event)"
            />
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
                query: `query {
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
