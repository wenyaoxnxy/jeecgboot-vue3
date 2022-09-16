import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '需求编号',
    align: 'center',
    dataIndex: 'xqNumber',
    width: '125px',
  },
  {
    title: '需求名称',
    align: 'center',
    dataIndex: 'xqName',
  },
  {
    title: '科技需求编号',
    align: 'center',
    dataIndex: 'kjxqNum',
    width: '160px',
  },
  {
    title: '科技子任务编号',
    align: 'center',
    dataIndex: 'ittaskNum',
    width: '190px',
  },
  {
    title: '系统名称',
    align: 'center',
    dataIndex: 'systems',
    customRender: ({ text }) => {
      return render.renderDict(text, 'system_name');
    },
  },
  {
    title: '评审阶段',
    align: 'center',
    dataIndex: 'reviewStep',
    customRender: ({ text }) => {
      return render.renderDict(text, 'step_status');
    },
  },
  {
    title: '评审人员',
    align: 'center',
    dataIndex: 'reviewMembers',
    // customRender: ({ text }) => {
    //   return render.renderDict(text, 'review_members');
    // },
  },
];
//查询数据
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
    colProps: {
      span: 12,
    },
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'system_name',
      placeholder: '请选择当前系统名称',
    },
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '需求编号',
    field: 'xqNumber',
    component: 'Input',
    colProps: {
      span: 12,
    },
  },
  {
    label: '需求名称',
    field: 'xqName',
    component: 'Input',
    colProps: {
      span: 12,
    },
  },
  {
    label: '科技需求编号',
    field: 'kjxqNum',
    component: 'Input',
    colProps: {
      span: 12,
    },
  },
  {
    label: '科技子任务编号',
    field: 'ittaskNum',
    component: 'Input',
    colProps: {
      span: 12,
    },
  },
  {
    label: '系统名称',
    field: 'systems',
    colProps: {
      span: 12,
    },
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'system_name',
      placeholder: '请选择当前系统名称',
    },
  },
  {
    label: '评审阶段',
    field: 'reviewStep',
    colProps: {
      span: 12,
    },
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'step_status',
      placeholder: '请选择当前阶段',
    },
  },
  {
    label: '评审人员',
    field: 'reviewMembers',
    component: 'JDictSelectTag',
    colProps: {
      span: 20,
    },
    componentProps: {
      dictCode: 'review_members',
      placeholder: '请选择评审人员',
      mode: 'multiple',
    },
  },
];
//子表表格配置
export const reviewDesignDetailColumns: JVxeColumn[] = [
  {
    title: '关联ID',
    key: 'refId',
    type: JVxeTypes.hidden,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '问题类型',
    key: 'problemType',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '问题描述',
    key: 'problemDescription',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '对应措施',
    key: 'problemMeasure',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '责任人',
    key: 'problemResponsible',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '问题状态',
    key: 'problemStatus',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '处理日期',
    key: 'problemFixTime',
    type: JVxeTypes.datetime,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '备注',
    key: 'note',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];
