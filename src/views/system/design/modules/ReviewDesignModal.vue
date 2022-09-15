<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="title" @ok="handleSubmit" width="1000px">
    <BasicForm @register="registerForm" ref="formRef" :labelCol="{ span: 8 }" />
    <!-- 子表单区域 -->
    <a-tabs v-model:activeKey="activeKey" @change="handleChangeTabs">
      <a-tab-pane tab="概设评审明细记录" key="reviewDesignDetail" :forceRender="true">
        <JVxeTable
          keep-source
          resizable
          ref="reviewDesignDetail"
          :loading="reviewDesignDetailTable.loading"
          :columns="reviewDesignDetailTable.columns"
          :dataSource="reviewDesignDetailTable.dataSource"
          :maxHeight="300"
          :rowNumber="false"
          :rowSelection="false"
          :toolbar="true"
        />
      </a-tab-pane>
    </a-tabs>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref, computed, unref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useJvxeMethod } from '/@/hooks/system/useJvxeMethods.ts';
  import { formSchema, reviewDesignDetailColumns } from '../ReviewDesign.data';
  import { saveOrUpdate, reviewDesignDetailList } from '../ReviewDesign.api';
  import { VALIDATE_FAILED } from '/@/utils/common/vxeUtils';
  // Emits声明
  const emit = defineEmits(['register', 'success']);
  const isUpdate = ref(true);
  const refKeys = ref(['reviewDesignDetail']);
  const activeKey = ref('reviewDesignDetail');
  const reviewDesignDetail = ref();
  const tableRefs = { reviewDesignDetail };
  const reviewDesignDetailTable = reactive({
    loading: false,
    dataSource: [],
    columns: reviewDesignDetailColumns,
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
      requestSubTableData(reviewDesignDetailList, { id: data?.record?.id }, reviewDesignDetailTable);
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
    activeKey.value = 'reviewDesignDetail';
    reviewDesignDetailTable.dataSource = [];
  }
  function classifyIntoFormData(allValues) {
    let main = Object.assign({}, allValues.formValue);
    return {
      ...main, // 展开
      reviewDesignDetailList: allValues.tablesValue[0].tableData,
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
</script>

<style lang="less" scoped></style>
