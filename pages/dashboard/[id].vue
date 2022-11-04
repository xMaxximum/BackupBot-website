<script setup>
definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
</script>

<template>
<a>{{route.params.id}}</a>
</template>