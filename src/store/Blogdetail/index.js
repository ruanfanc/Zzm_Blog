import { reqgetblogdetail } from "@/api";
const state = {
    Blogdetail: []
}
const mutations = {
    GETBLOGDETAIL(state, a) {
        state.Blogdetail = a
    },
}
const actions = {
    async getblogdetail(context, id) {
        let result = await reqgetblogdetail(id.id)
        if (result.status == 200) {
            context.commit("GETBLOGDETAIL", result);
        }
    },
}
const getters = {
    Blogcontent(state) {
        return state.Blogdetail.blogdetail ? state.Blogdetail.blogdetail[0] : {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}