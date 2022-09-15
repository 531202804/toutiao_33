<template>
  <div>
    <!-- 搜索导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          icon="search"
          size="small"
          round
          block
          @click="$router.push('/search')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 文字展示 -->
    <van-tabs v-model="active" swipeable>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章详情 -->
        <Article :id="item.id"></Article>
      </van-tab>

      <span class="toutiao toutiao-gengduo" @click="isShow = true"></span>
    </van-tabs>
    <!--  -->
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <Channel
        v-if="isShow"
        :myChannels="channels"
        @change-active=";[(isShow = false), (active = $event)]"
        @delChannel="delFn"
        @addChannel="addFn"
      ></Channel>
    </van-popup>
  </div>
</template>

<script>
import { getChannelAPI, delChannelAPI, addChannelAPI } from '@/api'
import Article from '@/views/Home/components/Article'
import Channel from '@/views/Home/components/Channel'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: { Article, Channel },
  data() {
    return {
      active: 0,
      channels: [],
      isShow: false
    }
  },
  created() {
    this.initChannel()
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapMutations(['SET_CHANNEL']),

    // 初始化
    initChannel() {
      if (this.isLogin) {
        // 已登录
        this.getChannel()
      } else {
        // 未登录
        const myChannels = this.$store.state.myChannels
        if (myChannels.length === 0) {
          this.getChannel()
        } else {
          this.channels = myChannels
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getChannelAPI()
        this.channels = data.data.channels
      } catch (error) {
        // js错误 程序员处理， axios状态码是507 提示用户刷新
        if (!error.response) {
          throw error
        } else {
          error.response.status === 507 ?? this.$toast.fail('请刷新')
        }
      }
    },
    // 删除我的频道功能
    async delFn(id) {
      // 发送请求删除频道
      const newChannels = this.channels.filter((item) => item.id !== id)
      try {
        if (this.isLogin) {
          // 发送请求删除频道
          await delChannelAPI(id)
        } else {
          // 如果未登录存入本地存储
          this.SET_CHANNEL(newChannels)
        }
        // 已删除的channels
        this.channels = newChannels
        this.$toast.success('删除频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('未登录，请先登录再删除')
        } else {
          throw error
        }
      }
    },
    // 添加到我的频道
    async addFn(item) {
      try {
        if (this.isLogin) {
          // 发送请求添加频道
          await addChannelAPI(item.id, this.channels.length)
        } else {
          // 如果未登录存入本地存储
          this.SET_CHANNEL([...this.channels, item])
        }

        this.channels.push(item)
        this.$toast.success('添加频道成功')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.$toast.fail('未登录，请先登录再添加')
        } else {
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  // inherit 继承
  // unset 不设置
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button--default {
    background-color: #5babfb;
    border: 0;
    color: #fff;
    font-size: 30px;
  }

  .van-icon {
    color: #fff;
  }
  .van-button--block {
    width: 7.4rem;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
