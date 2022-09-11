<template>
  <div>
    <!-- 没有图片 -->
    <van-cell
      v-if="item.cover.type === 0"
      :title="item.title"
      :label="`${item.aut_name} ${item.comm_count} ${item.pubdate}`"
    ></van-cell>
    <!-- 一张图 -->
    <van-cell
      v-else-if="item.cover.type === 1"
      :title="item.title"
      :label="`${item.aut_name} ${item.comm_count} ${item.pubdate}`"
    >
      <van-image
        width="100"
        height="100"
        :src="item.cover.images[0]"
      ></van-image>
    </van-cell>
    <!-- 三种图 -->
    <van-cell v-else :title="item.title">
      <template #label>
        <van-image
          v-for="(item, index) in item.cover.images"
          :key="index"
          width="100"
          height="100"
          :src="item"
        ></van-image>
        <p>{{ `${item.aut_name} ${item.comm_count} ${item.pubdate}` }}</p>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style></style>
