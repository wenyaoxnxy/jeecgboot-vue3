import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
// import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
import { readonly, ref, unref } from "vue";
import { filterMultiDictText } from '/@/utils/dict/JDictSelectUtil.js';
import { initDictOptions } from '/@/utils/dict';
let dictOptions = [];
const getConfig = async function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dictOptions = await initDictOptions('review_members');
};
getConfig();
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '需求编号',
    align: 'center',
    dataIndex: 'xqNumber',
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
  },
  {
    title: '科技子任务编号',
    align: 'center',
    dataIndex: 'ittaskNum',
  },
  {
    title: '系统名称',
    align: 'center',
    dataIndex: 'systemName',
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
    customRender: (text) => {
      return text.text ? filterMultiDictText(dictOptions, text.text) : '';
    },
    // customRender: ({ text }) =>//(text ? //filterMultiDictText(dictOptions.value['review_members'], text) : ''),
    //   (text ? filterMultiDictText(unref(dictOptions)['review_members'],text) : ''),
  },
  {
    title: 'findbugs报告记录',
    align: 'center',
    dataIndex: 'findbugsLog',
  },
  {
    title: 'sonar报告',
    align: 'center',
    dataIndex: 'sonarLog',
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
    field: 'systemName',
    colProps: {
      span: 12,
    },
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'system_name',
      placeholder: '请选择系统名称',
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
    field: 'systemName',
    colProps: {
      span: 12,
    },
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'system_name',
      placeholder: '请选择系统名称',
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
    componentProps: {
      dictCode: 'review_members',
      placeholder: '请选择评审人员',
      mode: 'multiple',
    },
  },
  {
    label: 'findbugs报告记录',
    field: 'findbugsLog',
    component: 'Input',
  },
  {
    label: 'sonar报告',
    field: 'sonarLog',
    component: 'Input',
  },
];
//子表表格配置
export const reviewCodeDetailColumns: JVxeColumn[] = [
  {
    title: '关联ID',
    key: 'refId',
    type: JVxeTypes.hidden,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '缺陷位置',
    key: 'bugLocation',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '缺陷描述',
    key: 'bugDescription',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '对应措施',
    key: 'bugMeasure',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '责任人',
    key: 'bugResponsible',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '修复时间',
    key: 'bugFixTime',
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
export const reviewCodeChecklistResultColumns: JVxeColumn[] = [
  {
    title: '关联ID',
    key: 'refId',
    type: JVxeTypes.hidden,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '检查分组',
    key: 'checkGroup',
    type: JVxeTypes.normal,
    width: '150px',
    placeholder: '请输入${title}',
    defaultValue: '',
    componentProps: {
      redonly: true,
    },
  },
  {
    title: '序号',
    key: 'seqNo',
    type: JVxeTypes.hidden,
    width: '20px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '确认项目',
    key: 'checkTitle',
    type: JVxeTypes.normal,
    width: '120px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '检查内容',
    key: 'checkContent',
    type: JVxeTypes.normal,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
  {
    title: '检查结果',
    key: 'problemStatus',
    type: JVxeTypes.select,
    width: '100px',
    placeholder: '请输入${title}',
    defaultValue: '',
    options: [
      // 下拉选项
      { title: '通过', value: '1' },
      { title: '不涉及', value: '2' },
    ],
  },
  {
    title: '备注及详细说明',
    key: 'note',
    type: JVxeTypes.input,
    width: '200px',
    placeholder: '请输入${title}',
    defaultValue: '',
  },
];
