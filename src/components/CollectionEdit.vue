<template>
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
        :bindable="collection.mode === 'dynamic' || mustUnbindVariables"
        @update:modelValue="setProp('variables', $event)"
        @add-item="addElem('variables')"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.key"
                label="Key"
                placeholder="Enter a value"
                :bindable="collection.mode === 'dynamic'"
                small
                @update:modelValue="setItem({ ...item, key: $event })"
            />
            <wwEditorInputRow
                type="query"
                :model-value="item.value"
                label="Value"
                placeholder="Enter a value"
                :bindable="collection.mode === 'dynamic'"
                small
                @update:modelValue="setItem({ ...item, value: $event })"
            />
        </template>
    </wwEditorInputRow>
    <wwEditorFormRow v-if="mustUnbindVariables">
        <div class="flex items-center error">
            <wwEditorIcon name="warning" />
            <div class="body-2 ml-2">Variables can only be bound in dynamic collection mode</div>
        </div>
    </wwEditorFormRow>
    <wwEditorInputRow
        type="array"
        :model-value="query.headers"
        label="Headers"
        :bindable="collection.mode === 'dynamic' || mustUnbindHeaders"
        @update:modelValue="setProp('headers', $event)"
        @add-item="addElem('headers')"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                type="query"
                :model-value="item.key"
                label="Key"
                placeholder="Enter a value"
                :bindable="collection.mode === 'dynamic'"
                small
                @update:modelValue="setItem({ ...item, key: $event })"
            />
            <wwEditorInputRow
                type="query"
                :model-value="item.value"
                label="Value"
                placeholder="Enter a value"
                :bindable="collection.mode === 'dynamic'"
                small
                @update:modelValue="setItem({ ...item, value: $event })"
            />
        </template>
    </wwEditorInputRow>
    <wwEditorFormRow v-if="mustUnbindHeaders">
        <div class="flex items-center error">
            <wwEditorIcon name="warning" />
            <div class="body-2 ml-2">Headers can only be bound in dynamic collection mode</div>
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow label="Result key">
        <wwEditorInputText
            type="text"
            :model-value="query.resultKey"
            placeholder="result.key"
            small
            @update:modelValue="setProp('resultKey', $event)"
        />
    </wwEditorFormRow>
    <wwEditorFormRow v-if="collection.mode === 'dynamic'">
        <div class="flex items-center">
            <wwEditorInputSwitch
                :model-value="query.isWithCredentials"
                @update:modelValue="setProp('isWithCredentials', $event)"
            />
            <div class="body-2 ml-2">Send credentials</div>
            <wwEditorQuestionMark tooltip-position="top-left" tooltip-name="rest-api-credentials" class="ml-auto" />
        </div>
    </wwEditorFormRow>
    <wwEditorFormRow >
        <div class="flex items-center">
            <wwEditorInputSwitch
                :model-value="!query.isFullResponse"
                @update:modelValue="setProp('isFullResponse', !$event)"
            />
            <div class="body-2 ml-2">Return data only</div>
        </div>
    </wwEditorFormRow>
</template>

<script>
export default {
    props: {
        collection: { type: Object, required: true },
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
                isWithCredentials: false,
                isFullResponse: false,
                ...this.config,
            };
        },
        mustUnbindVariables() {
            return this.collection.mode !== 'dynamic' && this.query.variables && this.query.variables.__wwtype;
        },
        mustUnbindHeaders() {
            return this.collection.mode !== 'dynamic' && this.query.headers && this.query.headers.__wwtype;
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

<style scoped>
.error {
    color: var(--ww-color-red-500);
}
</style>
