<template>
  <!-- 这个组件，仅用来演示.sync修饰符 -->
  <!-- 常规操作：1. 定义一个模板根组件，设置类名为组件名（短横线形式） -->
  <div class="text-document">
    <div>text-document组件：<input type="text" :value="title" @input="onInput" /></div>
  </div>
</template>

<script>
export default {
  // 常规操作：2. 定义name字段，指定组件名（大驼峰），为了方便在Vue调试面板中查看，如果不加就是匿名组件
  name: 'TextDocument',
  props: {
    title: { type: String },
  },
  methods: {
    onInput(e) {
      console.log(e.target.value);
      // 不能直接修改通过属性接收的值，因为违反的单向数据流
      // this.title = e.target.value;
      this.$emit('update:title', e.target.value);
    },
  },
};
</script>
