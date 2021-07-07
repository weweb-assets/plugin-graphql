<template>
    <div class="graphql-collection-summary">
        <div class="graphql-collection-summary__elem caption-s">Url: {{ config.url || '-' }}</div>
        <div class="graphql-collection-summary__elem caption-s">Query: {{ config.query || '-' }}</div>
    </div>
</template>

<script>
export default {
    props: {
        config: { type: Object, required: true },
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
