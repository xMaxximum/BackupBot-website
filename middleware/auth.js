import { useDiscordStore } from "~~/stores/DiscordStore"

export default defineNuxtRouteMiddleware((to, from) => {
    const discord = useDiscordStore()

    if (!discord.token) {
        return navigateTo('/')
    }
})