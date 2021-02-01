<template>
  <button 
    class="btn" 
    :type="type"
    :disabled="disabled"
    @click="click"
  >
  {{name}}
  </button>
</template>
<script>
export default {
  name: 'v-button',
  methods: {
    click() {
      this.$emit('click')
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    },
    name: {
      type: String,
      default: 'Добавить'
    }
  }
  
}
</script>
<style lang="scss">
  .btn {
    width: 100%;
    padding: 18px;
    text-align: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: #EBF4F8;
    background: #0880AE;
    box-shadow: 0px 2px 4px rgba($color: #2c2738, $alpha: .08),0px 4px 8px rgba($color: #2c2738, $alpha: .08);
    border: 2px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    outline: none;
    &:hover {
      box-shadow: 0px 12px 24px rgba($color: #2c2738, $alpha: .08),0px 24px 48px rgba($color: #2c2738, $alpha: .08);
    }
    &:active {
      border: 2px solid rgba($color: #2c2738, $alpha: .86);
    }
  }
  button:disabled {
    border: 2px solid transparent;
    color: #2C2738;
    background-color: #DBE2EA;
    box-shadow: 0px 2px 4px rgba($color: #2c2738, $alpha: .08),0px 4px 8px rgba($color: #2c2738, $alpha: .08);
    cursor: default;
    &:hover {
      box-shadow: 0px 2px 4px rgba($color: #2c2738, $alpha: .08),0px 4px 8px rgba($color: #2c2738, $alpha: .08);
    }
  }
</style>