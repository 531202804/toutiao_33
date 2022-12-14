// 新闻接口
import request from '@/utils/request'

/**
 *
 * @param {String | Number} id
 * @param { Number*} timestamp 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳

 * @returns
 */
export const getArticleAPI = (id, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
