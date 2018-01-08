import Vue from 'vue'
import Router from 'vue-router'
import CalendarMain from '../components/CalendarMain.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CalendarMain',
      component: CalendarMain
    }
  ]
})
