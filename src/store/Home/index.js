import { reqgetblogsinfo, reqgetsorts, reqgetlabels, reqgetblogsnum } from "@/api";
const state = {
    Blogsinfo: [],
    sorts: [],
    labels: [],
    blogsnum: 0,
}
const mutations = {
    GETBLOGSINFO(state, a) {
        state.Blogsinfo = a
    },
    GETSORTS(state, a) {
        state.sorts = a.sorts
    },
    GETLABELS(state, a) {
        state.labels = a.labels
    },
    GETBLOGSNUM(state, a) {
        state.blogsnum = a.blogsnum[0].num
    }
}
const actions = {
    async getblogsinfo(context, params) {
        const id = params ? params : 1
        let result = await reqgetblogsinfo(id)
        if (result.status == 200) {
            context.commit("GETBLOGSINFO", result);
        }
    },
    async getsorts(context, params) {
        let result = await reqgetsorts()
        if (result.status == 200) {
            context.commit("GETSORTS", result);
        }
    },
    async getlabels(context, params) {
        let result = await reqgetlabels()
        if (result.status == 200) {
            context.commit("GETLABELS", result);
        }
    },
    async getblogsnum(context, params) {
        let result = await reqgetblogsnum()
        if (result.status == 200) {
            context.commit("GETBLOGSNUM", result);
        }
    },
}
const getters = {
    Blogs(state) {
        return state.Blogsinfo.blogs
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}