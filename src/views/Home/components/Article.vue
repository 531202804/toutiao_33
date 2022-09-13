<template>
  <div class="article">
    <!-- 属性 -->
    <!-- @load: 触底的时候触发load事件 -->
    <!-- offset: 滚动条和底部距离多少的时候触发load事件, 默认值是300px -->
    <!-- immediate-check: 初渲染的时候是否执行load事件, 默认值是true  -->
    <!-- v-model="loading" -->
    <!-- loading为true,load事件不会被触发 -->
    <!-- loading为false的时候,load事件会被触发 -->
    <!-- loading会在load事件执行后,被van-list组件自动设置为ture, 需要手动的改为false -->
    <!-- finished:Boolean. false:load事件会被触发 true:load事件不会被出发了, 并且显示finished-text的文本 -->
    <van-pull-refresh v-model="refreshLoading" @refresh="getonLoad">
      <van-list
        @load="getonLoad"
        offset="100"
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem v-for="item in articles" :key="item.art_id" :item="item">{{
          item
        }}</ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAPI } from '@/api'
import ArticleItem from './ArticleItem'

export default {
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      pretime: '',
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  props: {
    id: [String, Number]
  },

  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        this.articles = data.data.results
        console.log(data.data.results)
        this.pretime = data.data.pre_timestamp
      } catch (error) {
        // js的错误，上抛：400 上抛中文，507原封不动
        const status = error.response?.status
        if (!error.response || status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },
    async getonLoad() {
      try {
        // 发送请求
        const { data } = await getArticleAPI(this.id, this.pretime)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }

        // 添加到articles
        if (this.refreshLoading) {
          // 如果是下拉刷新 将数据放在最前
          this.articles.unshift(...data.data.results)
        } else {
          // 如果是下滑加载 将数据放在最后
          this.articles.push(...data.data.results)
        }
        // 更新时间戳
        this.pretime = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // finally语句一定会执行
        // 加载完成后 避免一直存在 更改loading为false
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    // 透明色
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #7eb5ed;
    border-radius: 10px;
  }
}
</style>
