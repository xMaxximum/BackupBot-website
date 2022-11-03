<script setup>
const route = useRoute()
</script>

<template>
<a>{{route.params.id}}</a>
</template>