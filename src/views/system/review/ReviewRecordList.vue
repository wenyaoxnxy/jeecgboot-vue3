<template>
  <div>
    <!--引用表格-->
    <BasicTable @register="registerTable" :rowSelection="rowSelection">
      <!--插槽:table标题-->
      <template #tableTitle>
        <a-button type="primary" @click="handleAdd" preIcon="ant-design:plus-outlined"> 新增</a-button>
        <a-button type="primary" preIcon="ant-design:export-outlined" @click="onExportXls"> 导出</a-button>
        <j-upload-button type="primary" preIcon="ant-design:import-outlined" @click="onImportXls">导入</j-upload-button>
        <a-dropdown v-if="selectedRowKeys.length > 0">
          <template #overlay>
            <a-menu>
              <a-menu-item key="1" @click="batchHandleDelete">
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
          <a-button
            >批量操作
            <Icon icon="mdi:chevron-down" />
          </a-button>
        </a-dropdown>
      </template>
      <!--操作栏-->
      <template #action="{ record }">
        <TableAction :actions="getTableAction(record)" :dropDownActions="getDropDownAction(record)" />
      </template>
    </BasicTable>

    <!-- 表单区域 -->
    <ReviewRecordModal @register="registerModal" @success="handleSuccess" />

    <!-- 代码评审表单 -->
    <ReviewCodeModal @register="codeReviewModal" @success="reload" />
  </div>
</template>

<script lang="ts" name="review-reviewRecord" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useModal } from '/@/components/Modal';
  import { useListPage } from '/@/hooks/system/useListPage';
  import ReviewRecordModal from './modules/ReviewRecordModal.vue';
  import ReviewCodeModal from '../code/modules/ReviewCodeModal.vue';
  import { columns, searchFormSchema } from './ReviewRecord.data';
  import { list, deleteOne, batchDelete, getImportUrl, getExportUrl, addCodeReview, addPublishReview } from './ReviewRecord.api';
  import { assignWith } from 'lodash-es';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  //注册model
  const [registerModal, { openModal }] = useModal();

  const [codeReviewModal, { openModal: openCodeReviewModal }] = useModal();

  //注册table数据
  const { prefixCls, tableContext, onExportXls, onImportXls } = useListPage({
    tableProps: {
      title: '评审记录登记表',
      api: list,
      columns,
      canResize: false,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: false,
        showAdvancedButton: false,
      },
      actionColumn: {
        width: 120,
      },
    },
    exportConfig: {
      name: '评审记录登记表',
      url: getExportUrl,
    },
    importConfig: {
      url: getImportUrl,
    },
  });

  const [registerTable, { reload }, { rowSelection, selectedRowKeys }] = tableContext;

  /**
   * 新增事件
   */
  function handleAdd() {
    openModal(true, {
      isUpdate: false,
      showFooter: true,
    });
  }
  /**
   * 编辑事件
   */
  function handleEdit(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: true,
    });
  }
  /**
   * 详情
   */
  function handleDetail(record: Recordable) {
    openModal(true, {
      record,
      isUpdate: true,
      showFooter: false,
    });
  }
  /**
   * 删除事件
   */
  async function handleDelete(record) {
    await deleteOne({ id: record.id }, reload);
  }
  /**
   * 批量删除事件
   */
  async function batchHandleDelete() {
    await batchDelete({ ids: selectedRowKeys.value }, reload);
  }
  /**
   * 成功回调
   */
  function handleSuccess({ isUpdate, values }) {
    reload();
  }
  /**
   * 操作栏
   */
  function getTableAction(record) {
    return [
      {
        label: '编辑',
        onClick: handleEdit.bind(null, record),
      },
    ];
  }
  /**
   * 发起代码评审
   */
  async function handCodeReview(record: Recordable) {
    //let result = addCodeReview({xqNumber: record.xqNumber,kjxqNum:record.kjxqNum,ittaskNum:record.ittaskNum}, reload);
    let [result] = await Promise.all([
      addCodeReview(
        {
          id: record.id,
          xqNumber: record.xqNumber,
          kjxqNum: record.kjxqNum,
          ittaskNum: record.ittaskNum,
          xqName: record.xqName,
          systems: record.systems,
        },
        reload
      ),
    ]);
    console.log(result, '======>');
    router.push({
      path: '/system/code',
      query: {
        id: result.id,
      },
    });
  }

  /**
   * 发起上线评审
   */
  async function handPublishReview(record: Recordable) {
    //let result = addCodeReview({xqNumber: record.xqNumber,kjxqNum:record.kjxqNum,ittaskNum:record.ittaskNum}, reload);
    let result = await addPublishReview({ id: record.id, xqNumber: record.xqNumber, kjxqNum: record.kjxqNum, ittaskNum: record.ittaskNum, xqName: record.xqName, systems: record.systems }, reload);
    console.log(result, '======>');
    router.push({
      path: '/system/publish',
      query: {
        id: result.id,
      },
    });
    // let record =
    // let param = {
    //   xqNumber: result.xqNumber,
    //   // isUpdate: true,
    //   // showFooter: true,
    // };
    // console.log(param,"=====>formdata")
    // openCodeReviewModal(true, param);
    // openModal(true, {
    //   codeReviewModal,
    //   isUpdate: true,
    //   showFooter: false,
    // });
  }

  /**
   * 发起概要设计评审
   */
  async function handDesignReview(record: Recordable) {
    let result = await addDesignReview({ id: record.id, xqNumber: record.xqNumber, kjxqNum: record.kjxqNum, ittaskNum: record.ittaskNum, xqName: record.xqName, systems: record.systems }, reload);
    console.log(result, '======>');
    router.push({
      path: '/system/publish',
      query: {
        id: result.id,
      },
    });
  }

  /**
   * 下拉操作栏
   */
  function getDropDownAction(record) {
    return [
      {
        label: '发起概要设计评审',
        onClick: handDesignReview.bind(null, record),
      },
      {
        label: '发起代码评审',
        onClick: handCodeReview.bind(null, record),
      },
      {
        label: '发起上线评审',
        onClick: handPublishReview.bind(null, record),
      },
      {
        label: '详情',
        onClick: handleDetail.bind(null, record),
      },
      {
        label: '删除',
        popConfirm: {
          title: '是否确认删除',
          confirm: handleDelete.bind(null, record),
        },
      },
    ];
  }
</script>
<style scoped></style>
