/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const brandDbRouter = {
  path: '/brandDb',
  component: Layout,
  redirect: '/brandDb/knownBrands',
  name: 'brandDb',
  meta: {
    title: '品牌库统计',
    icon: 'nested'
  },
  children: [
    {
      path: 'knownBrands',
      name: 'knownBrands',
      component: () => import('@/views/brand_db/known_brands/index'),
      meta: { title: '已有品牌统计' }
    },
    {
      path: 'unknownBrands',
      name: 'unknownBrands',
      component: () => import('@/views/brand_db/unknown_brands/index'),
      meta: { title: '未知品牌统计' }
    },
    {
      path: 'bmys',
      name: 'bmys',
      component: () => import('@/views/brand_db/bmys/index'),
      meta: { title: '年款统计' }
    }
  ]
}

export default brandDbRouter
