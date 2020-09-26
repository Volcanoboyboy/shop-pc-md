<template>
  <div class="md-input-button">
    <!-- native: 会在组件内部的根元素上监听该原生事件，子元素可以通过冒泡的形式触发 -->
    <!-- @keyup.enter.native="handleInputConfirm" -->
    <!-- @change 仅在输入框失去焦点或用户按下回车时触发（并且需要值发生变化时） -->

    <!-- 不能直接使用 v-model="value" 绑定，因为 value 是通过 props 接收的属性，违反了单向数据流 -->
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      :value="value"
      @input="onInputOfElInput"
      ref="input"
      size="small"
      @keyup.enter.native="hideInput"
      @blur="hideInput"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script>
export default {
  name: 'MdInputButton',
  // 可以配置该组件使用 v-model 指令时，配套的属性名和事件名
  model: {
    prop: 'value', // 属性名
    event: 'input', // 事件名
  },
  props: {
    value: {
      type: String,
    },
  },
  data() {
    return {
      inputVisible: false,
    };
  },
  methods: {
    onInputOfElInput(value) {
      this.$emit('input', value);
    },
    hideInput() {
      this.inputVisible = false;
      this.$emit('blur-or-enter');
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.input.focus();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.md-input-button {
  display: inline-block;
}
</style>
