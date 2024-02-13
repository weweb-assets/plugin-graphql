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
    <wwEditorFormRow>
        <div class="flex items-center">
            <wwEditorInputSwitch :model-value="isWithCredentials" @update:modelValue="setIsWithCredentials" />
            <div class="body-2 ml-2">Send credentials</div>
            <wwEditorQuestionMark tooltip-position="top-left" tooltip-name="rest-api-credentials" class="ml-auto" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow >
        <div class="flex items-center">
            <wwEditorInputSwitch
                :model-value="!isFullResponse"
                @update:modelValue="setIsFullResponse(!$event)"
            />
            <div class="body-2 ml-2">Return data only</div>
        </div>
    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Object, required: true },
    },
    emits: ['update:args'],
    computed: {
        url() {
            return this.args.url;
        },
        query() {
            return this.args.query;
        },
        variables() {
            return this.args.variables || [];
        },
        headers() {
            return this.args.headers || [];
        },
        isWithCredentials() {
            return this.args.isWithCredentials || false;
        },
        isFullResponse() {
            return this.args.isFullResponse || false;
        },
    },
    methods: {
        setUrl(url) {
            this.$emit('update:args', { ...this.args, url });
        },
        setQuery(query) {
            this.$emit('update:args', { ...this.args, query });
        },
        setVariables(variables) {
            this.$emit('update:args', { ...this.args, variables });
        },
        setIsWithCredentials(isWithCredentials) {
            this.$emit('update:args', { ...this.args, isWithCredentials });
        },
        setIsFullResponse(isFullResponse) {
            this.$emit('update:args', { ...this.args, isFullResponse });
        },
        setHeaders(headers) {
            this.$emit('update:args', { ...this.args, headers });
        },
    },
};
</script>
