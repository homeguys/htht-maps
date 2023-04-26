<template>
  <div class="validate-input-container pb-3">
    <input
      class="form-control"
      :class="{ 'is-invalid': inputRef.error }"
      @blur="validateInput"
      v-model="inputRef.val"
      @input="updateInput"
      v-bind="$attrs"
    />
    <div v-if="inputRef.error" class="invalid-feedback">
      {{ inputRef.message }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, computed, onMounted } from 'vue';
import { emitter } from './ValidateForm.vue';

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}

export type RulesProp = RuleProp[];

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
  },
  setup(props, context) {
    const inputRef = reactive({
      // val: computed({
      //   get: () => props.modelValue || '',
      //   set: (val) => {
      //     context.emit('update:modelValue', val);
      //   },
      // }),
      val: props.modelValue || '',
      error: false,
      message: '',
    });

    const updateInput = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.val = targetValue;

      context.emit('update:modelValue', targetValue);
    };

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;

          inputRef.message = rule.message;

          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== '';
              break;
            case 'email':
              passed = emailReg.test(inputRef.val);
              break;
            case 'custom':
              passed = rule.validator ? rule.validator() : true;
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };

    onMounted(() => {
      emitter.emit('form-item-created', validateInput);
    });

    return {
      inputRef,
      validateInput,
      updateInput,
    };
  },
});
</script>

<style scoped></style>
