<script setup>
definePageMeta({
  middleware: 'auth'
})
const appConfig = useAppConfig()
const discord = useDiscordStore()

const { data: guilds } = await useLazyFetch(`${appConfig.apiBase}/getguilds/${discord.token}`, {
  method: 'GET',
  parseResponse: JSON.parse
}).catch((error) => {
  console.error(error.data)
})

function getIcon(hash, guildId) {
  return hash ? `https://cdn.discordapp.com/icons/${guildId}/${hash}.webp?size=2048` :
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDANwJPVe_q50Zhr9E0E_S7sP0M8lA-gm0umXUTDX5&s"
}

</script>

<template>
  <div class="h-screen">
    <div v-if="guilds" class="items-center justify-center place-content-center grid customGrid">
      <label class="text-3xl content-center text-center">Servers the bot is in:</label>
      <ul class="flex items-center justify-center space-x-5 sm:space-x-10 flex-wrap pl-7 pr-7">
        <li v-for="guild in guilds.filter(x => x.BotJoined)"
          class="hover:scale-150 text-center flex flex-col place-items-center items-center justify-items-center">
          <div class="w-28 mask mask-circle">
            <NuxtLink :to="{ path: 'dashboard/' + guild.Id }">
              <img :src="getIcon(guild.Icon, guild.Id)" :alt="guild.Name" />
            </NuxtLink>
          </div>
          <label>{{ guild.Name }}</label>
        </li>
      </ul>
      <div class="flex items-center justify-center">
        <div class="collapse collapse-arrow">
          <input type="checkbox" />
          <div class="collapse-title text-xl font-medium">
            Show invitable servers
          </div>
          <ul class="collapse-content flex flex-row items-center justify-center">
            <ul class="flex items-center justify-center space-x-5 sm:space-x-10 flex-wrap pl-7 pr-7"></ul>
            <li v-for="guild in guilds.filter(x => !x.BotJoined)" class="hover:scale-150 text-center flex flex-col">
              <div class="w-28 mask mask-circle">
                <NuxtLink
                  :to="guild.BotJoined ? { path: 'dashboard/' + guild.Id } : appConfig.botInvite + '&guild_id=' + guild.Id">
                  <img :src="getIcon(guild.Icon, guild.Id)" :alt="guild.Name" />
                </NuxtLink>
              </div>
              <label>{{ guild.Name }}</label>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else-if="guilds === undefined && guilds.length === 0" class="flex items-center justify-center">
      <label>There are no guilds!</label>
    </div>
    <Loading v-else />
  </div>
</template>

<style>
.customGrid {
  grid-template-rows: 100px 200px 200px;
}
</style>