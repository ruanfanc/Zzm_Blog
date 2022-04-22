import { reqgermusic } from "@/api/music";
const state = {
    nowPlayUrl: '',
    musicList: [],
}
const mutations = {
    GETMUSIC(state, music) {
        state.nowPlayUrl = music.musicurl;
        state.musicList.push(music);
    }
}
const actions = {
    async getmusic(context, music) {
        const musicdetail = music
        const musicurl = await reqgermusic(musicdetail.id)
        musicdetail.musicurl = musicurl.data[0].url;
        if (musicurl.code == 200) {
            context.commit('GETMUSIC', musicdetail)
        }
    }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters,
}