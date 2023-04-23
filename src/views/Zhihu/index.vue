<template>
  <section id="zhihu">
    <nav-bar :user="user" />
    <!-- <column-list :list="list" /> -->
    <section class="mainContent">
      <router-view />
    </section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ColumnList, { ColumnProps } from '@/components/Zhihu/ColumnList.vue';
import NavBar, { UserProps } from '@/components/Zhihu/NavBar.vue';

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://img1.baidu.com/it/u=1629479163,3719818209&fm=253&fmt=auto&app=138&f=JPEG',
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://img1.baidu.com/it/u=1629479163,3719818209&fm=253&fmt=auto&app=138&f=JPEG',
  },
  {
    id: 3,
    title: 'test1的专栏',
    description: '这是test3专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://img1.baidu.com/it/u=1629479163,3719818209&fm=253&fmt=auto&app=138&f=JPEG',
  },
  {
    id: 4,
    title: 'test1的专栏',
    description:
      '这是test3专栏，有一段非常有意思的简介，可以更新一下哦这是test3专栏，有一段非常有意思的简介，可以更新一下哦这是test3专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://img1.baidu.com/it/u=1629479163,3719818209&fm=253&fmt=auto&app=138&f=JPEG',
  },
  {
    id: 5,
    title: 'test1的专栏',
    description: '这是test3专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://img1.baidu.com/it/u=1629479163,3719818209&fm=253&fmt=auto&app=138&f=JPEG',
  },
];

const userData: UserProps = {
  isLogin: false,
  name: 'Mking',
};

export default defineComponent({
  name: 'Index',
  components: {
    ColumnList,
    NavBar,
  },
  setup() {
    return {
      list: testData,
      user: userData,
    };
  },
});
</script>

<style lang="less">
#zhihu {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mainContent {
  flex: 1 1;
}
</style>
