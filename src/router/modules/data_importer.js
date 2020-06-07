/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataImporterRouter = {
  path: '/dataImporter',
  component: Layout,
  redirect: '/dataImporter/gghBmy',
  name: 'dataImporter',
  meta: {
    title: '数据导入',
    icon: 'nested'
  },
  children: [
    {
      path: 'gghBmy',
      name: 'gghBmy',
      component: () => import('@/views/data_importer/ggh_bmy/index'),
      meta: { title: '导入公告号年款' }
    },
    {
      path: 'importFiles',
      name: 'importFiles',
      component: () => import('@/views/data_importer/import_files/index'),
      meta: { title: '导入图片文件' }
    },
    {
      path: 'generateTestDs',
      name: 'generateTestDs',
      component: () => import('@/views/data_importer/generate_test_ds/index'),
      meta: { title: '生成测试数据集' }
    },
    {
      path: 'getDeltaDs',
      name: 'getDeltaDs',
      component: () => import('@/views/data_importer/get_delta_ds/index'),
      meta: { title: '生成增量数据集' }
    },
    {
      path: 'putDeltaDs',
      name: 'putDeltaDs',
      component: () => import('@/views/data_importer/put_delta_ds/index'),
      meta: { title: '导入增量数据集' }
    }
  ]
}

export default dataImporterRouter
