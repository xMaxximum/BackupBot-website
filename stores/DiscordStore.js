export const useDiscordStore = defineStore('useDiscordStore', () => {
    const token = ref('');
    const refreshToken = ref('');
    const userName = ref('');
    const pfp = ref('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDANwJPVe_q50Zhr9E0E_S7sP0M8lA-gm0umXUTDX5&s');
    const id = ref('');

    return { token, refreshToken, userName, pfp, id};
}, {
    persist: true
})