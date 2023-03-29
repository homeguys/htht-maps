<template>
  <section id="zhihu" class="container">
    <ColumnList :list="list"></ColumnList>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '@/components/Zhihu/ColumnList.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是test1专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://img1.baidu.com/it/u=1629479163,3719818209&fm=253&fmt=auto&app=138&f=JPEG'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是test2专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://img1.baidu.com/it/u=1629479163,3719818209&fm=253&fmt=auto&app=138&f=JPEG'
  },
  {
    id: 3,
    title: 'test1的专栏',
    description: '这是test3专栏，有一段非常有意思的简介，可以更新一下哦',
    avatar: 'https://img1.baidu.com/it/u=1629479163,3719818209&fm=253&fmt=auto&app=138&f=JPEG'
  }
]

export default defineComponent({
  name: 'Index',
  components: {
    ColumnList
  },
  setup() {
    return {
      list: testData
    }
  }
})
</script>
