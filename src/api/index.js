import { requests } from "./requests";

export const login = data => requests({ url: "/blog/login", data, method: "POST" })

export const createBlog = data => requests({ url: "/user/createBlog", data, method: "POST" })

export const uploadimg = data => requests({ url: "/blog/uploadimg", data, method: "POST" })

export const reqgetblogsinfo = data => requests({ url: `/blog/getblogsinfo/${data}`, method: "GET" })

export const reqgetblogdetail = data => requests({ url: `/blog/getblogdetail/${data}`, method: "GET" })

export const reqgetsorts = data => requests({ url: "/blog/getsorts", data, method: "POST" })

export const reqgetlabels = data => requests({ url: "/blog/getlabels", data, method: "POST" })

export const reqgetblogsnum = data => requests({ url: "/blog/getblogsnum", data, method: "POST" })

export const reqgetlabelinfo = (data, index) => requests({ url: `/blog/sort/getlabelinfo/${data}/${index}`, method: "GET" })

export const reqgetsortinfo = (data, index) => requests({ url: `/blog/sort/getsortinfo/${data}/${index}`, method: "GET" })

export const reqgetdateindexs = data => requests({ url: `/blog/getdateindexs/${data}`, method: "GET" })

export const reqdeleteblog = data => requests({ url: `/blog/deleteBlog`, data, method: "POST" })

