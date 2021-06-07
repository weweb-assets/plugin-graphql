<template>
    <div class="graphql-collection-summary">
        <div class="graphql-collection-summary__elem caption-s">Url: {{ config.url || '-' }}</div>
        <div class="graphql-collection-summary__elem caption-s">Query: {{ config.query || '-' }}</div>
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
            return !!this.config.url && !!this.config.query;
        },
    },
};
</script>

<style lang="scss" scoped>
.graphql-collection-summary {
    &__elem {
        margin-bottom: var(--ww-spacing-01);
    }
}
</style>
