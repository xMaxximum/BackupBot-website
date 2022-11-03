export const useDiscordStore = defineStore('useDiscordStore', () => {
    const token = ref('');
    const refreshToken = ref('');
    const loggedIn = ref(false);

    return { token, refreshToken, loggedIn};
}, {
    persist: true
})