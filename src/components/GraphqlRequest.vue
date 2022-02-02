<template>
    <wwEditorInputRow
        type="query"
        label="Url"
        required
        name="url"
        :model-value="url"
        placeholder="https://api-url.com/graphql"
        large
        bindable
        @update:modelValue="setUrl"
    />
    <wwEditorFormRow label="Query" required>
        <wwEditorInputCode name="query" :model-value="query" large language="graphql" @update:modelValue="setQuery" />
    </wwEditorFormRow>
    <wwEditorInputRow
        type="array"
        :model-value="variables"
        label="Variables"
        bindable
        @update:modelValue="setVariables"
        @add-item="setVariables([...(variables || []), {}])"
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
        :model-value="headers"
        label="Headers"
        bindable
        @update:modelValue="setHeaders"
        @add-item="setHeaders([...(headers || []), {}])"
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
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Array, default: () => [null, null, [], [], [], null] },
    },
    emits: ['update:args'],
    computed: {
        url() {
            return this.args[0];
        },
        query() {
            return (
                this.args[1] ||
                `query {
    posts {
        nodes {
            title
        }
    }
}`
            );
        },
        variables() {
            return this.args[2];
        },
        headers() {
            return this.args[3];
        },
    },
    methods: {
        setUrl(url) {
            this.$emit('update:args', [url, this.query, this.variables, this.headers]);
        },
        setQuery(query) {
            this.$emit('update:args', [this.url, query, this.variables, this.headers]);
        },
        setVariables(variables) {
            this.$emit('update:args', [this.url, this.query, variables, this.headers]);
        },
        setHeaders(headers) {
            this.$emit('update:args', [this.url, this.query, this.variables, headers]);
        },
    },
};
</script>
