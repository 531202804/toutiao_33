/* eslint-disable camelcase */
import request from '@/utils/request'

export const getSuggestionsAPI = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 * @param {Number} page 页数
 * @param {Number} per_page 一页里的数据
 * @param {String} q 搜索关键词
 * @returns
 */
/* eslint-disable */
export const getresultsAPI = (page, per_page, q) => {
  return request({
    url: '/v1_0/search',
    params: {
      page,
      per_page,
      q
    }
  })
}
