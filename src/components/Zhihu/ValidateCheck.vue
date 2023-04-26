<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      :checked="checkRef.val"
      id="flexCheckDefault"
      @change="handleChangeCheckBox"
    />
    <label class="form-check-label" for="flexCheckDefault"> checkbox </label>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'ValidateInput',
  props: {
    modelValue: Boolean,
  },
  setup(props, context) {
    console.warn('props', props);
    const checkRef = reactive({
      val: props.modelValue || false,
      error: false,
      message: '',
    });

    const handleChangeCheckBox = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).checked;
      checkRef.val = targetValue;

      context.emit('update:modelValue', targetValue);
    };

    return {
      checkRef,
      handleChangeCheckBox,
    };
  },
});
</script>

<style scoped></style>
