import Vue from 'vue'
import Router from 'vue-router'
import SkulptView from '@/components/SkulptView'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SkulptView',
      component: SkulptView
    }
  ]
})
