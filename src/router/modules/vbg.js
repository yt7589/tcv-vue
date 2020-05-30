/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const vbgRouter = {
  path: '/vbg',
  component: Layout,
  redirect: '/vbg/vbGame',
  name: 'vbg',
  meta: {
    title: '品牌游戏',
    icon: 'nested'
  },
  children: [
    {
      path: 'vbGame',
      name: 'vbGame',
      component: () => import('@/views/vbg/vb_game/index'),
      meta: { title: '品牌小游戏' }
    }
  ]
}

export default vbgRouter
