import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('components/home/home')
const DraftNotice = () => import('components/draft-notice/draft-notice')
const NotReviewedNotice = () => import('components/not-reviewed-notice/not-reviewed-notice')
const HasReviewNotice = () => import('components/has-reviewed-notice/has-reviewed-notice')


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {   
    	path: '/home',
    	component: Home
    },
    {
    	path: '/draft-notice',
    	component: DraftNotice
    },
    {
    	path: '/not-reviewed-notice',
    	component: NotReviewedNotice
    },
    {
    	path: '/has-reviewed-notice',
    	component: HasReviewNotice
    }
  ]
})
