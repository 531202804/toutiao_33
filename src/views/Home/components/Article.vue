<template>
  <div>
    <ArticleItem v-for="item in results" :key="item.id" :item="item">{{
      item
    }}</ArticleItem>
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
      results: []
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
        this.results = data.data.results
        console.log(this.results)
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
    }
  }
}
</script>

<style></style>
