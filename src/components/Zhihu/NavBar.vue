<template>
  <nav class="navbar bg-dark mb-4 justify-content-between px-4">
    <router-link to="/zhihu" class="navbar-brand text-primary">知乎</router-link>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <router-link to="/zhihu/login" class="btn btn-primary">登陆</router-link>
      </li>
      <li class="list-inline-item">
        <router-link to="/zhihu/login" class="btn btn-primary">注册</router-link>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <dropdown :title="`你好 ${user.name}`">
          <dropdown-item>
            <router-link to="/create" class="dropdown-item">新建文章</router-link>
          </dropdown-item>
          <dropdown-item>
            <router-link :to="`/column/${user.column}`" class="dropdown-item">我的专栏</router-link>
          </dropdown-item>
          <dropdown-item disabled>
            <a href="#" class="dropdown-item">编辑资料</a>
          </dropdown-item>
          <dropdown-item>
            <a href="#" class="dropdown-item">退出登陆</a>
          </dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Dropdown from './Dropdown.vue';
import DropdownItem from './DropdownItem.vue';

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'NavBar',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  components: {
    Dropdown,
    DropdownItem,
  },
});
</script>

<style lang="less" scoped></style>
