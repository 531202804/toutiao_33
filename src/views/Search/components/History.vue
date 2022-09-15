<template>
  <div>
    <van-cell title="搜索历史">
      <template #extra>
        <van-icon name="delete-o" v-if="!isEidt" @click="isEidt = true" />
        <div v-else>
          <span @click="$store.commit('SET_HISTORY', [])">全部删除</span> &nbsp;
          <span @click="isEidt = false">完成</span>
        </div>
      </template>
    </van-cell>

    <!-- 搜索历史 -->
    <van-cell
      :title="item"
      v-for="item in history"
      :key="item"
      @click="!isEidt && $emit('change-keywords', item)"
    >
      <template #extra>
        <van-icon
          name="close"
          v-show="isEidt"
          @click="
            $store.commit(
              'SET_HISTORY',
              history.filter((i) => item !== i)
            )
          "
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isEidt: false
    }
  },
  computed: {
    ...mapState(['history'])
  },
  methods: {}
}
</script>

<style></style>
