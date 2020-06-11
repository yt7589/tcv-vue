/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataAnnoRouter = {
  path: '/dataAnno',
  component: Layout,
  redirect: '/dataAnno/setBmyExample',
  name: 'dataAnno',
  meta: {
    title: '数据标注',
    icon: 'nested'
  },
  children: [
    {
      path: 'setBmyExample',
      name: 'setBmyExample',
      component: () => import('@/views/data_anno/set_bmy_example/index'),
      meta: { title: '设置示例图片' }
    },
    {
      path: 'filterImages',
      name: 'filterImages',
      component: () => import('@/views/data_anno/filter_images/index'),
      meta: { title: '筛选品牌库图片' }
    },
    {
      path: 'checkImages',
      name: 'checkImages',
      component: () => import('@/views/data_anno/check_images/index'),
      meta: { title: '审核筛选图片' }
    }
  ]
}

export default dataAnnoRouter
