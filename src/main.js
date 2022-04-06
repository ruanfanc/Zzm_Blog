import Vue from 'vue'
import App from './App.vue'
import { Button, Popover, Image, Container, CarouselItem, Carousel, Icon, Card, Option, Upload, Timeline, TimelineItem, Pagination, Select, Header, Aside, Main, Footer, Input, Menu, MessageBox, Message, Submenu, MenuItem, MenuItemGroup, Dropdown, DropdownMenu, Table, TableColumn, DropdownItem, Form, FormItem, } from 'element-ui';
import router from './router'
import store from './store';
import './assets/iconfont/footer-label/iconfont.css';
import './assets/iconfont/NavMenu/iconfont.css';
import './assets/iconfont/Blogs-detail/iconfont.css';
import './assets/iconfont/Blogs-label/iconfont.css';
import animated from 'animate.css'
import Navmenu from './components/Navmenu/index';
import FooterNav from './components/FooterNav/index';
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.config.productionTip = false
Vue.use(animated)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Image)
Vue.use(Form)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Popover)
Vue.use(Container)
Vue.use(Select)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(DropdownItem)
Vue.use(Button)
Vue.component('NavMenu', Navmenu)
Vue.component('FooterNav', FooterNav)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')

