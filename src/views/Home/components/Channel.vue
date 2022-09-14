<template>
  <div class="channels">
    <!-- 我的频道 -->
    <!-- 标题 -->
    <van-cell title="我的频道">
      <van-button
        class="btn"
        size="mini"
        round
        style="border-color: #5babfb; color: #5babfb"
        @click="isClick = !isClick"
        >{{ isClick ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <div class="my-pannel">
      <van-grid :border="false" gutter="10">
        <van-grid-item
          v-for="(item, index) in myChannels"
          :class="{ active: item.name === '推荐' }"
          :key="item.id"
          :text="item.name"
          :icon="isClick && item.name !== '推荐' ? 'cross' : ''"
          @click="handleChannel(item, index)"
        >
        </van-grid-item>
      </van-grid>
    </div>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <div class="recommend-pannel">
      <van-grid :border="false" gutter="10">
        <van-grid-item
          v-for="item in recommendChannels"
          :key="item.id"
          :text="item.name"
          icon="plus"
          @click="$emit('addChannel', item)"
        >
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannelAPI } from '@/api'
export default {
  props: {
    myChannels: []
  },
  data() {
    return {
      isClick: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannel()
  },
  methods: {
    async getAllChannel() {
      const { data } = await getAllChannelAPI()
      this.allChannels = data.data.channels
    },

    handleChannel(item, index) {
      if (this.isClick && item.name !== '推荐') {
        this.$emit('delChannel', item.id)
      } else {
        // 关闭弹窗
        // 切换频道
        this.$emit('change-active', index)
      }
    }
  },
  computed: {
    // 在所有的频道里把我的频道进行筛选
    recommendChannels() {
      return this.allChannels.filter((allChannelsitem) => {
        return !this.myChannels.find(
          (myChannelsitem) => myChannelsitem.id === allChannelsitem.id
        )
      })
    }
  }
}
</script>

<style scoped lang="less">
// postcss插件不能把行内样式的px转化成rem
:deep(.active) {
  .van-grid-item__text {
    color: red;
  }
}
.channels {
  padding-top: 92px;
}
:deep(.btn) {
  width: 100px;
  font-size: 25px;
}
:deep(.van-grid-item__content) {
  background-color: #f4f5f6;
}
// 我的频道
.my-pannel {
  // 编辑按钮居中
  .van-cell__value {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  // 关闭按钮样式
  :deep(.van-grid-item__content) {
    position: relative;

    .van-grid-item__content {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
}
:deep(.van-icon-cross) {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 30px;
  font-weight: 700;
  border-radius: 50%;
  text-align: center;
  line-height: 0.32rem;
  color: red;
}
// 推荐频道
.recommend-pannel {
  // 推荐频道加号样式
  :deep(.van-grid-item__content) {
    flex-direction: row;

    .van-grid-item__icon {
      color: #5babfb;
      font-size: 0.5rem;
    }

    .van-grid-item__text {
      margin-top: 0;
    }
  }
}
</style>
