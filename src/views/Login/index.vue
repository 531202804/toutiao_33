<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" left-arrow>
      <template #left> <van-icon name="cross" /> </template
    ></van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mebileR"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeR"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            class="btn"
            round
            block
            type="default"
            size="small"
            native-type="button"
            v-if="isTimer"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="3 * 1000"
            format="ss秒"
            v-else
            @finish="isTimer = true"
          />
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mebileR, codeR } from './rules'
import { login, sendCodeAPI } from '@/api/user'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      mobile: '',
      code: '',
      mebileR,
      codeR,
      isTimer: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async onSubmit(values) {
      // 只有在表单校验通过才会触发提交事件
      this.loading()
      try {
        const { data } = await login(this.mobile, this.code)
        // 将token存进vuex
        this.SET_TOKEN(data.data)
        this.$router.push('/my')
        this.$toast.success('登录成功')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '登录中',
        forbidClick: true,
        duration: 0,
        overlay: true
      })
    },
    onClickLeft() {},

    async sendCode() {
      await this.$refs.form.validate('mobile')
      this.loading()
      try {
        await sendCodeAPI(this.mobile)
        this.$toast.success('发送验证码成功')
        this.isTimer = false
      } catch (error) {
        if (
          (error.response && error.response.status === 429) ||
          error.response.status === 404
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: rgb(24, 145, 232);
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 45px;
  }
}
.btn {
  background-color: #eee;
  color: #9e8792;
  height: 0.64rem;
}
</style>
