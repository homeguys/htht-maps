<template>
  <section class="zhihuLogin">
    <section class="loginForm">
      <ValidateForm @form-submit="onFormSubmit">
        <section class="mb-3">
          <label class="form-label">邮箱地址</label>
          <ValidateInput type="text" :rules="emialRules" v-model="emailVal" placeholder="请输入邮箱地址" />
        </section>
        <section class="mb-3">
          <label class="form-label">密码</label>
          <ValidateInput type="password" :rules="passwordRules" v-model="passwordVal" placeholder="请输入邮箱地址" />
        </section>

        <template #submit>
          <button type="submit" class="btn btn-primary btn-block btn-large w-100">登录</button>
        </template>
      </ValidateForm>
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ValidateInput, ValidateForm, RulesProp } from '@/components/Zhihu';
import createMessage from '@/components/Zhihu/createMessage';

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm,
  },
  inheritAttrs: false,
  setup() {
    const router = useRouter();
    const store = useStore();
    const emailVal = ref('');
    const emialRules: RulesProp = [
      { type: 'required', message: '邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的邮箱格式' },
    ];

    const passwordVal = ref('');
    const passwordRules: RulesProp = [{ type: 'required', message: '密码不能为空' }];

    const checkVal = ref(true);

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value,
        };

        store
          .dispatch('loginAndFetch', payload)
          .then((data) => {
            createMessage('登录成功 2秒后跳转首页', 'success');
            setTimeout(() => {
              router.push('/zhihu');
            }, 2000);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    };

    return {
      emailVal,
      emialRules,
      passwordVal,
      passwordRules,
      checkVal,
      onFormSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.zhihuLogin {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginForm {
  width: 500px;
}
</style>
