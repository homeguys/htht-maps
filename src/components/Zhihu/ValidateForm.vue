<template>
  <form class="validate-form-container">
    <slot name="default"></slot>

    <section class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </section>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue';
import mitt from 'mitt';

type ValidateFunc = () => boolean;
export const emitter: any = mitt();

export default defineComponent({
  emits: {
    formSubmit: (payload: boolean) => {
      if (payload) {
        return true;
      }
      return false;
    },
  },
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];
    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((item) => item);
      context.emit('formSubmit', result);
    };

    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func);
      }
    };

    emitter.on('form-item-created', callback);

    onUnmounted(() => {
      emitter.off('form-item-created', callback);
      funcArr = [];
    });

    return {
      submitForm,
    };
  },
});
</script>

<style scoped></style>
