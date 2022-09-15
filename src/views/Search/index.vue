<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        background="#3396fc"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="searchResults = false"
        @cancel="$router.push('/')"
      />
    </form>
    <!-- 搜索历史 -->
    <!-- <History></History>
    <Result></Result>
    <Suggestion></Suggestion> -->
    <component
      :is="componentName"
      :keywords="keywords"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import History from '@/views/Search/components/History'
import Result from '@/views/Search/components/Result'
import Suggestion from '@/views/Search/components/Suggestion'
import { mapMutations, mapState } from 'vuex'

export default {
  components: { History, Result, Suggestion },
  data() {
    return {
      keywords: '',
      searchResults: false
    }
  },
  computed: {
    ...mapState(['history']),
    componentName() {
      // 如果搜索框没有值 或者为空 显示搜索历史
      if (this.keywords === '') {
        return 'History'
      }
      // 如果搜索框有值,且没有触发搜索事件 显示搜索建议
      if (this.searchResults) {
        return 'Result'
      }
      // 如果搜索框触发搜索事件 显示搜索结果
      return 'Suggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORY']),
    onSearch(keywords) {
      // 触发条件 1 用户敲击回车 2点击了搜索建议
      // 把 keywords关键词存起来
      // 去重: 1 获取没有去重的数组 2 放到new Set() 3 声明一个变量接收 = [...new Set(没有去重的数组)]
      const repeathistory = [...new Set([keywords, ...this.history])]
      this.SET_HISTORY(repeathistory)
      this.keywords = keywords
      this.searchResults = true
    }
  }
}
</script>

<style scoped lang="less">
.van-search__action {
  color: #fff;
}
</style>
