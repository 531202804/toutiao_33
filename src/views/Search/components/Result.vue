<template>
  <div class="results">
    <van-list
      @load="getresults"
      v-model="loading"
      :finished="finished"
      finished-text="加载已完成"
      :error.sync="error"
      error-text="加载失败，请刷新重试"
    >
      <van-cell
        v-for="item in results"
        :title="item.title"
        :key="item.art_id"
        @click="
          $router.push({
            path: '/detail',
            query: { articleId: item.art_id }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getresultsAPI } from '@/api'

export default {
  props: {
    keywords: String
  },
  data() {
    return {
      loading: false,
      page: 1,
      perpage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getresults() {
      try {
        // if (Math.random() < 0.8) {
        //   throw new Error()
        // }
        const { data } = await getresultsAPI(
          this.page++,
          this.perpage,
          this.keywords
        )
        if (data.data.results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...data.data.results]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.results {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
