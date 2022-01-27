<template>
  <div>
    <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
      <option disabled value="">Выберите из списка</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        > {{ option.name }} </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  methods: {
    // changeOption(event) {
    //   this.$emit('update:modelValue', event.target.value);
    // },
  },
};
</script>
