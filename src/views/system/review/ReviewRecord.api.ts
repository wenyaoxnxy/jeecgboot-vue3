import {defHttp} from '/@/utils/http/axios';
import {Modal} from 'ant-design-vue';

enum Api {
  list = '/review/reviewRecord/list',
  save='/review/reviewRecord/add',
  edit='/review/reviewRecord/edit',
  deleteOne = '/review/reviewRecord/delete',
  deleteBatch = '/review/reviewRecord/deleteBatch',
  importExcel = '/review/reviewRecord/importExcel',
  exportXls = '/review/reviewRecord/exportXls',
  addCodeReview = '/review/reviewRecord/addCodeReview',
  addPublishReview = '/review/reviewRecord/addPublishReview',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) =>
  defHttp.get({url: Api.list, params});

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params,handleSuccess) => {
  return defHttp.delete({url: Api.deleteOne, params}, {joinParamsToUrl: true}).then(() => {
    handleSuccess();
  });
}
/**
 * 批量删除
 * @param params
 * @param handleSuccess
 */
export const batchDelete = (params, handleSuccess) => {
  Modal.confirm({
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({url: Api.deleteBatch, data: params}, {joinParamsToUrl: true}).then(() => {
        handleSuccess();
      });
    }
  });
}
/**
 * 保存或者更新
 * @param params
 * @param isUpdate 是否是更新数据
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({url: url, params});
}

/**
 * 初始化代码评审记录
 * @param params
 */
export const addCodeReview = (params) => {
  let url = Api.addCodeReview;
  return defHttp.post({url: url, data: params});
}

/**
 * 初始化上线评审记录
 * @param params
 */
export const addPublishReview = (params) => {
  let url = Api.addPublishReview;
  return defHttp.post({url: url, data: params});
}
