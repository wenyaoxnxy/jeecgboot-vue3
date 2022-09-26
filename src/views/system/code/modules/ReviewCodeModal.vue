<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="1000px">
  <a-card :bordered="true">
      <a-row :gutter="8">
        <a-col :span="12">
          <BasicForm @register="registerForm" ref="formRef" :labelCol="{ span: 8 }" />
          <!-- 子表单区域 -->
          <a-dev v-model:activeKey="activeKey" @change="handleChangeTabs">
            <a-dev tab="代码评审明细记录" key="reviewCodeDetail" :forceRender="true">
              <JVxeTable
                keep-source
                resizable
                ref="reviewCodeDetail"
                :loading="reviewCodeDetailTable.loading"
                :columns="reviewCodeDetailTable.columns"
                :dataSource="reviewCodeDetailTable.dataSource"
                :maxHeight="300"
                :rowNumber="false"
                :rowSelection="false"
                :toolbar="true"
              />
            </a-dev>
          </a-dev>
        </a-col>
      <a-col :span="12">
      <a-dev tab="代码评审检查清单检查结果" key="reviewCodeChecklistResult" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="reviewCodeChecklistResult"
          :loading="reviewCodeChecklistResultTable.loading"
          :columns="reviewCodeChecklistResultTable.columns"
          :dataSource="reviewCodeChecklistResultTable.dataSource"
          :maxHeight="800"
          :rowNumber="false"
          :rowSelection="false"
          :toolbar="false"
        />
      </a-dev>
      </a-col>
      </a-row>
    </a-card>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, reactive, onMounted } from "vue";
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods.ts';
  import { formSchema, reviewCodeDetailColumns, reviewCodeChecklistResultColumns } from '../ReviewCode.data';
  import { saveOrUpdate, reviewCodeDetailList, reviewCodeChecklistResultList } from '../ReviewCode.api';
  import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils';
  import { initDictOptions } from "/@/utils/dict";
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const refKeys = ref(['reviewCodeDetail', 'reviewCodeChecklistResult']);
  const activeKey = ref('reviewCodeDetail');
  const reviewCodeDetail = ref();
  const dictOptions = ref<any>([]);
  const reviewCodeChecklistResult = ref();
  const tableRefs = { reviewCodeDetail, reviewCodeChecklistResult };
  const reviewCodeDetailTable = reactive({
    loading: false,
    dataSource: [],
    columns: reviewCodeDetailColumns,
  });
  const reviewCodeChecklistResultTable = reactive({
    loading: false,
    dataSource: [],
    columns: reviewCodeChecklistResultColumns,
  });
  //表单配置
  const [registerForm, { setProps, resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 150,
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  //表单赋值
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    //重置表单
    await reset();
    setModalProps({ confirmLoading: false, showCancelBtn: data?.showFooter, showOkBtn: data?.showFooter });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      //表单赋值
      await setFieldsValue({
        ...data.record,
      });
      requestSubTableData(reviewCodeDetailList, { id: data?.record?.id }, reviewCodeDetailTable);
      requestSubTableData(reviewCodeChecklistResultList, { id: data?.record?.id }, reviewCodeChecklistResultTable);
    }
    // 隐藏底部时禁用整个表单
    setProps({ disabled: !data?.showFooter });
  });
  //方法配置
  const [handleChangeTabs, handleSubmit, requestSubTableData, formRef] = useJvxeMethod(requestAddOrEdit, classifyIntoFormData, tableRefs, activeKey, refKeys);

  //设置标题
  const title = computed(() => (!unref(isUpdate) ? '新增' : '评审内容'));

  async function reset() {
    await resetFields();
    activeKey.value = 'reviewCodeDetail';
    reviewCodeDetailTable.dataSource = [];
    reviewCodeChecklistResultTable.dataSource = [];
  }
  function classifyIntoFormData(allValues) {
    let main = Object.assign({}, allValues.formValue);
    return {
      ...main, // 展开
      reviewCodeDetailList: allValues.tablesValue[0].tableData,
      reviewCodeChecklistResultList: allValues.tablesValue[1].tableData,
    };
  }

  //表单提交事件
  async function requestAddOrEdit(values) {
    try {
      setModalProps({ confirmLoading: true });
      //提交表单
      await saveOrUpdate(values, isUpdate.value);
      //关闭弹窗
      closeModal();
      //刷新列表
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  /**
   * 初始化字典选项
   */
  async function initDictConfig() {
    dictOptions.value['review_members'] = await initDictOptions('review_members');
  }

  onMounted(() => {
    //初始化字典选项
    initDictConfig();
  });
</script>

<style lang="less" scoped></style>
