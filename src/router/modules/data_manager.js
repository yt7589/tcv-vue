/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataManagerRouter = {
  path: '/dataManager',
  component: Layout,
  redirect: '/dataManager/updateDict',
  name: 'dataManager',
  meta: {
    title: '品牌库管理',
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
      path: 'importData',
      name: 'importData',
      component: () => import('@/views/data_manager/import_data/index'),
      meta: { title: '导入目录内容' }
    },
    {
      path: 'generateDeltaDs',
      name: 'generateDeltaDs',
      component: () => import('@/views/data_manager/generate_delta_ds/index'),
      meta: { title: '生成增量数据集' }
    },
    {
      path: 'generateTestDs',
      name: 'generateTestDs',
      component: () => import('@/views/data_manager/generate_test_ds/index'),
      meta: { title: '生成测试数据集' }
    },
    {
      path: 'saveToDataset',
      name: 'saveToDataset',
      component: () => import('@/views/data_manager/save_to_dataset/index'),
      meta: { title: '保存数据集' }
    },
    {
      path: 'createDclTrainDs',
      name: 'createDclTrainDs',
      component: () => import('@/views/data_manager/create_dcl_train_ds/index'),
      meta: { title: '生成DCL训练集' }
    },
    {
      path: 'createDclTestDs',
      name: 'createDclTestDs',
      component: () => import('@/views/data_manager/create_dcl_test_ds/index'),
      meta: { title: '生成DCL测试集' }
    }
  ]
}

export default dataManagerRouter
