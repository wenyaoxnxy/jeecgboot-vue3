import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { JVxeTypes, JVxeColumn } from '/@/components/jeecg/JVxeTable/types';
import { readonly } from 'vue';
import { filterMultiDictText } from '/@/utils/dict/JDictSelectUtil.js';
import { initDictOptions } from '/@/utils/dict';
let dictOptions = [];
const getConfig = async function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dictOptions = await initDictOptions('system_name');
};
getConfig();

export const columns: BasicColumn[] = [
  {
    title: '检查分组',
    dataIndex: 'checkGroup',
  },
  {
    title: '序号',
    dataIndex: 'seqNo',
  },
  {
    title: '确认项目',
    dataIndex: 'checkTitle',
  },
  {
    title: '检查内容',
    dataIndex: 'checkContent',
  },
  {
    title: '检查结果',
    dataIndex: 'problemStatus',
  },
  {
    title: '备注及详细说明',
    dataIndex: 'note',
    customRender: (text) => {
      return text.text ? filterMultiDictText(dictOptions, text.text) : '';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '检查分组',
    field: 'checkGroup',
    component: 'Input',
  },
  {
    label: '序号',
    field: 'seqNo',
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  // TODO 主键隐藏字段，目前写死为ID
  { label: '', field: 'id', component: 'Input', show: false },
  {
    label: '检查分组',
    field: 'checkGroup',
    component: 'Input',
  },
  {
    label: '序号',
    field: 'seqNo',
    component: 'Input',
  },
  {
    label: '确认项目',
    field: 'checkTitle',
    component: 'Input',
  },
  {
    label: '检查内容',
    field: 'checkContent',
    component: 'Input',
  },
  {
    label: '检查结果',
    field: 'problemStatus',
    component: 'Input',
  },
  {
    label: '备注及详细说明',
    field: 'note',
    component: 'JDictSelectTag',
    componentProps: {
      dictCode: 'system_name',
      placeholder: '请选择系统名称',
      mode: 'multiple',
    },
  },
];
