/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataManagerRouter = {
  path: '/dataManager',
  component: Layout,
  redirect: '/dataManager/updateDict',
  name: 'dataManager',
  meta: {
    title: '数据管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'updateDict',
      name: 'updateDict',
      component: () => import('@/views/data_manager/update_dict/index'),
      meta: { title: '更新数据字典' }
    },
    {
      path: 'sampleData',
      name: 'sampleData',
      component: () => import('@/views/data_manager/sample_data/index'),
      meta: { title: '抽样数据' }
    },
    {
      path: 'importData',
      name: 'importData',
      component: () => import('@/views/data_manager/import_data/index'),
      meta: { title: '导入数据' }
    }
  ]
}

export default dataManagerRouter
