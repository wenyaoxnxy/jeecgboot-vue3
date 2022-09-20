import { defHttp } from '/@/utils/http/axios';
import { Modal } from 'ant-design-vue';

enum Api {
  list = '/publish/reviewPublishMain/list',
  save = '/publish/reviewPublishMain/add',
  edit = '/publish/reviewPublishMain/edit',
  deleteOne = '/publish/reviewPublishMain/delete',
  deleteBatch = '/publish/reviewPublishMain/deleteBatch',
  importExcel = '/publish/reviewPublishMain/importExcel',
  exportXls = '/publish/reviewPublishMain/exportXls',
  reviewPublishList = '/publish/reviewPublishMain/queryReviewPublishByMainId',
  reviewPublishDetailList = '/publish/reviewPublishMain/queryReviewPublishDetailByMainId',
  reviewPublishChecklistResultList = '/publish/reviewPublishMain/queryReviewPublishChecklistResultByMainId',
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
 * 查询子表数据
 * @param params
 */
export const reviewPublishList = Api.reviewPublishList;
/**
 * 查询子表数据
 * @param params
 */
export const reviewPublishDetailList = Api.reviewPublishDetailList;
/**
 * 查询子表数据
 * @param params
 */
export const reviewPublishChecklistResultList = Api.reviewPublishChecklistResultList;
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 * @param params
 * @param handleSuccess
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp.delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true }).then(() => {
    handleSuccess();
  });
};
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
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 * @param isUpdate 是否是更新数据
 */
export const saveOrUpdate = (params, isUpdate) => {
  const url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
