<script setup>
const discord = useDiscordStore()
const userGuilds = useGuildStore()
let dGuilds = ref()

if (discord.token) {
    dGuilds = await $fetch(`https://localhost:7116/getguilds/${discord.token}`, {
    method: 'GET',
    parseResponse: JSON.parse
  }).catch((error) => {
    console.error(error.data)
  })
}
else {
  await navigateTo('/')
}

function getIcon(hash, guildId) {
  return `https://cdn.discordapp.com/icons/${guildId}/${hash}.webp?size=2048`
}

</script>

<template>
    <div v-if="dGuilds">
      <div>
        <ul class="flex items-center justify-center space-x-10 mt-5 sm:h-screen flex-col sm:flex-row">
          <li v-for="guild in dGuilds" class="hover:scale-150">
            <div class="avatar">
          <div class="w-24 rounded-full">
          <img :src="getIcon(guild.Icon, guild.Id)" :alt="guild.Name"/>
          </div>
        </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
     <!-- <label>There are no guilds available!</label> -->
     <NuxtLoadingIndicator/> 
    </div>
</template>