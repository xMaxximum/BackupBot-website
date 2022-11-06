<script setup>
definePageMeta({
  middleware: ['auth', 'checkguild']
})

const route = useRoute()
const appConfig = useAppConfig()
const discord = useDiscordStore()

const { data: guild } = await useLazyFetch(`${appConfig.apiBase}/getguild/${route.params.id}&id=${discord.id}`, {
  method: 'GET',
  parseResponse: JSON.parse
}).catch((error) => {
  console.error(error.data)
})

if (guild.Result == 'Unauthorized') {
  await navigateTo('/dashboard')
}

// https://daisyui.com/components/tab/
</script>

<template>
  <div class="flex items-center h-screen justify-center">
    <div v-if="guild">
      <label>Dashboard for {{ guild.Name }}</label>
    </div>
    <Loading v-else />
  </div>
</template>