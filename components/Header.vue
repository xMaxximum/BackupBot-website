<script setup>
const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const discord = useDiscordStore()

let buttonName = ref('Login')
let href = ref(runtimeConfig.redirectOauth)
let pfp = ref('')
let user = ref()

if (route.query.code) {
  const params = new URLSearchParams({
    client_id: runtimeConfig.clientId,
    client_secret: runtimeConfig.clientSecret,
    code: route.query.code,
    grant_type: 'authorization_code',
    redirect_uri: 'http://localhost:3000'
  })

  const lol = await $fetch('https://discord.com/api/v10/oauth2/token', {
    method: 'POST',
    body: params,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    parseResponse: JSON.parse
  }).catch((error) => {
    console.error(error.data)
  })

  if (lol) {
    discord.$patch({ refreshToken: lol.refresh_token, token: lol.access_token })
    await navigateTo('/')
  }
}
else if (discord.token) {
    user = await $fetch('https://discord.com/api/v10/users/@me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${discord.token}`
    },
    parseResponse: JSON.parse
  })

  if (user) {
    pfp = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`
    console.log(user)
    discord.loggedIn = true
    buttonName = 'Dashboard'
    href = '/dashboard'
  }
}
</script>

<template>
  <div class="navbar bg-base-300 z-50 mb-8">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </label>
        <!-- For mobile on left the menu bar-->
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <NuxtLink :to="runtimeConfig.botInvite" target="_blank">Invite</NuxtLink>
          </li>
          <li><a>Docs</a></li>
          <li tabindex="0">
            <a class="justify-between">
              About
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
              </svg>
            </a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <a class="btn btn-ghost normal-case text-xl" href="/">BackupBot</a>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        <li tabindex="0">
          <NuxtLink :to="runtimeConfig.redirectOauth" target="_blank">Invite</NuxtLink>
        </li>
        <li tabindex="0"><a>Docs</a></li>
        <li tabindex="0">
          <a>
            About
            <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </a>
          <ul class="p-2 bg-base-300">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <NuxtLink class="btn" v-if="!discord.token" :to="href">{{buttonName}}</NuxtLink>
      <div v-else class="flex justify-center items-center rounded-lg bg-base-100">
        <ClientOnly>
        <div class="avatar">
          <div class="w-14 rounded-full">
          <img v-if="pfp" :src="pfp"/>
        </div>
        </div>
        <div class="dropdown dropdown-hover">
          <label tabindex="0" class="btn m-1 normal-case">{{user.username}}#{{user.discriminator}}</label>
          <ul tabindex="0" class="dropdown-content menu p-2 right-2 shadow bg-base-200 rounded-box w-52">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><label class="text-red-500">Logout</label></li>
          </ul>
        </div>
      </ClientOnly>
      </div>
    </div>
  </div>
</template>