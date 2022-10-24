import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes } from '/@/components/jeecg/JVxeTable/src/types';

export const columns: BasicColumn[] = [
  {
    title: '需求编号',
    dataIndex: 'xqNumber',
    width: '125px',
  },
  {
    title: '需求名称',
    dataIndex: 'xqName',
  },
  {
    title: '科技需求编号',
    dataIndex: 'kjxqNum',
    width: '160px',
  },
  {
    title: '科技子任务编号',
    dataIndex: 'ittaskNum',
    width: '190px',
  },
  {
    title: '系统名称',
    dataIndex: 'systems',
    customRender: ({ text }) => {
      return render.renderDict(text, 'system_name');
    },
  },
  // {
  //   title: '概要设计评审',
  //   dataIndex: 'reviewDesign',
  //   width: '120px',
  //   customRender: ({ text }) => {
  //     return render.renderDict(text, 'review_status');
  //   },
  // },
  {
    title: '代码评审',
    dataIndex: 'reviewCode',
    width: '80px',
    customRender: ({ text }) => {
      return render.renderDict(text, 'review_status');
    },
  },
  {
    title: '上线评审',
    dataIndex: 'reviewPublish',
    width: '80px',
    customRender: ({ text }) => {
      return render.renderDict(text, 'review_status');
    },
  },
  {
    title: '投产日期',
    dataIndex: 'versionplan',
    width: '100px',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '需求编号',
    field: 'xqNumber',
    component: 'Input',
  },
  {
    label: '需求名称',
    field: 'xqName',
    component: 'Input',
  },
  {
    label: '系统名称',
    field: 'systems',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'system_name',
      placeholder: '请选择系统名称',
    },
  },
  {
    label: '投产日期',
    field: 'versionplan',
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '需求编号',
    field: 'xqNumber',
    component: 'Input',
  },
  {
    label: '需求名称',
    field: 'xqName',
    component: 'Input',
  },
  {
    label: '科技需求编号',
    field: 'kjxqNum',
    component: 'Input',
  },
  {
    label: '科技子任务编号',
    field: 'ittaskNum',
    component: 'Input',
  },
  {
    label: '系统名称',
    field: 'systems',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'system_name',
      placeholder: '请选择系统名称',
    },
  },
  // {
  //   label: '概要设计评审',
  //   field: 'reviewDesign',
  //component: 'JDictSelectTag',
  // componentProps: {
  //   dictCode: 'review_status',
  //   placeholder: '评审阶段',
  // },
  // },
  {
    label: '代码评审',
    field: 'reviewCode',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'review_status',
      placeholder: '评审阶段',
    },
  },
  {
    label: '上线评审',
    field: 'reviewPublish',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'review_status',
      placeholder: '评审阶段',
    },
  },
  {
    label: '投产日期',
    field: 'versionplan',
    component: 'Input',
  },
];
