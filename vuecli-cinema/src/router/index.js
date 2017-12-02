import Vue from 'vue'
import Router from 'vue-router'
import Overview from '@/components/Overview'
import Detail from '@/components/Detail'

Vue.use(Router)

export default new Router({
  routes: [    
    {
    	path: '/', 
    	component: Overview, 
    	name: 'home'
  	},
	{ 
		path: '/movie/:id',
		component: Detail,
		name: 'movie'
	},
	{
		path: '*',
		redirect: { name: 'home' }
	}
  ]
})
