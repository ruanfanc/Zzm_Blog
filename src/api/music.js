import { musicrequest } from "./requests";
import md5 from 'blueimp-md5'

export const Login = data => musicrequest({ url: `/login/cellphone?phone=13647907006&md5_password=${md5('zzm030814')}`, method: "GET" })

export const reqgetcarousel = data => musicrequest({ url: "/banner", method: "GET" })

export const reqgetsheets = data => musicrequest({ url: "/personalized?limit=10", method: "GET" })

export const reqgetsongs = data => musicrequest({ url: "/personalized/newsong?limit=12", method: "GET" })

export const reqgetmvs = data => musicrequest({ url: "/personalized/mv", method: "GET" })

export const reqgermusic = data => musicrequest({ url: `/song/url?id=${data}`, method: "GET" })

export const reqsearchmusic = data => musicrequest({ url: `/cloudsearch?keywords=${data}&limit=10`, method: "GET" })

export const reqgetsearchsheets = data => musicrequest({ url: `/cloudsearch?keywords=${data}&limit=7&type=1000`, method: "GET" })

export const reqgetsheetdetails = data => musicrequest({ url: `/playlist/detail?id=${data}`, method: "GET" })