import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import http from './utils/http'

Vue.config.productionTip = false

Vue.use(ElementUI);

Vue.prototype.$http = http;

let app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// export default app 