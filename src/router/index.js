import VueRouter from 'vue-router';
import vue from 'vue'
import Blog_Sort from '../pages/Blog_Sort';
import Home from '@/pages/Home'
import Blogdetail from '@/pages/Blogdetail'
import Search from '../pages/Search'
import Music from '../pages/Music'
import MusicHome from '../pages/Music/Home'
import MusicSearch from '../pages/Music/Search'
import Sheet from '../pages/Music/Sheet'
import DateIndex from '../pages/DateIndex'
import About from '../pages/About'
import Article from '../pages/Article'
import LeaveWord from '../pages/LeaveWord'
import CreateArticle from '../pages/Article/CreateArticle'
import ListArticle from '../pages/Article/ListArticle'
vue.use(VueRouter)
// 重写push方法，使控制台不警告
let orginPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        orginPush.call(this, location, resolve, reject);
    } else {
        orginPush.call(this, location, () => { }, () => { });
    }

}
let router = new VueRouter({
    routes: [
        { path: '/Sort/:detail?/:name?', component: Blog_Sort, name: "Sort" },
        { path: '/Home', component: Home, name: 'Home' },
        { path: '/Search', component: Search, name: 'Search' },
        {
            path: '/Music', redirect: './Music/Home', component: Music, name: 'Music', children: [
                { path: 'Home', component: MusicHome, name: 'MusicHome' },
                { path: 'Search', component: MusicSearch, name: 'MusicSearch' },
                { path: 'Sheet', component: Sheet, name: 'Sheet' }
            ]
        },
        { path: '/Blogdetail/:id?', component: Blogdetail, name: 'Blogdetail' },
        { path: '/LeaveWord', component: LeaveWord, name: 'LeaveWord' },
        { path: '/DateIndex', component: DateIndex, name: 'DateIndex' },
        { path: '/About', component: About, name: 'About' },
        {
            path: '/Article', component: Article, name: 'Article', children: [
                { path: 'CreateArticle', component: CreateArticle, name: 'CreateArticle' },
                { path: 'ListArticle', component: ListArticle, name: 'ListArticle' },
            ]
        },
        { path: '*', redirect: './Home' },

    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})
router.beforeEach(({ name }, from, next) => {
    // 获取 JWT Token
    if (name == 'Article' || name == 'CreateArticle' || name == 'ListArticle') {
        if (sessionStorage.getItem('token')) {
            next()
        } else {
            next('Home')
            alert('没有管理员权限')
        }
    } else {
        next();
    }
});

export default router