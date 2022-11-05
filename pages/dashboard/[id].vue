<script setup>
definePageMeta({
  middleware: ['auth', 'checkguild']
})

const route = useRoute()
const appConfig = useAppConfig()
const discord = useDiscordStore()

const { data: guild } = await useLazyFetch(`${appConfig.apiBase}/getguild/${route.params.id}`, {
  method: 'GET',
  parseResponse: JSON.parse
}).catch((error) => {
  console.error(error.data)
})

const req = await $fetch(`${appConfig.apiBase}/getguild/869686963828035644`, {
        headers: {
            //"userid": discord.id
        }
    })

console.log(req)

// fix this

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