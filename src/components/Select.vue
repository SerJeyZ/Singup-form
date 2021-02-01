<template>
  <div class="select">
    <label 
      class="form-label" 
      :for="id"
    >{{placeholder}}</label>
    <div 
      class="select__wrap"
      @click="isOptionVisible=!isOptionVisible"
    >
      <input 
        class="form-control select-control"
        type="text"
        :id="id"
        :placeholder="placeholder"
        :value="value"
        autocomplete="off"
        readonly
        
      >
    </div>
    <div class="select__options" v-if="isOptionVisible">
      <ul class="options-list">
        <li 
          class="options-list__item" 
          v-for="option in options"
          :key="option.val"
          @click="chooseOption(option)"
        >{{option.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'custom-select',
  data() {
    return {
      isOptionVisible: false
    }
  },
  props: {
    id:{
      type: String,
      default:''
    },
    value: {
      type: String,
      default:''
    },
    placeholder: {
      type: String,
      default:''
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  
  methods: {
    hideOptionsList() {
      this.isOptionVisible=false
    },
    chooseOption(option) {
      this.$emit('select', option)
      this.isOptionVisible=false
    }
  },
  mounted() {
    document.addEventListener('click',this.hideOptionsList.bind(this),true)
  },
  beforeDestroy() {
    document.removeEventListener('click',this.hideOptionsList)
  }
  
}
</script>

<style lang="scss">
  .select {
    position: relative;
    &__wrap {
      position: relative;
      border-radius: 6px;
      background-color: #ffffff;
      &::after {
        content: '';
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        background: url('../assets/img/arrow-down.svg') no-repeat center center/contain;
      }

    }
  }
  .form-control.select-control {
    background: transparent;
  }
  .select-control {
    position: relative;
    padding-right: 35px;
    cursor: pointer;
    z-index: 1;
  }
  .form-control.select-control:focus::-webkit-input-placeholder {
    color: #2C2738
  }

  .form-control.select-control:focus::-moz-placeholder {
    color: #2C2738
  }

  .form-control.select-control:focus:-moz-placeholder {
    color: #2C2738
  }

  .form-control.select-control:focus:-ms-input-placeholder {
    color: #2C2738
  }
  .select__options {
    position: absolute;
    top: 105%;
    left: 0;
    width: 100%;
    max-height: 230px;
    padding: 12px 0;
    background: #FFFFFF;
    border: 1px solid #DBE2EA;
    box-sizing: border-box;
    box-shadow: 0px 4px 8px rgba($color: #2c2738, $alpha: .04), 0px 20px 20px rgba($color: #2c2738, $alpha: .04);
    border-radius: 6px;
    overflow-y: auto;
    z-index: 2;
    @media(max-width: 450px) {
      top: 102%;
      padding: 0;
    }
  }
  .options-list {
    width: 100%; 
    padding: 0;
    margin: 0;
    list-style-type: none;
    &__item {
      padding: 15px 12px;
      font-weight: normal;
      font-size: 16px;
      line-height: 21px;
      color: #756F86;
      cursor: pointer;
    }
    &__item:hover {
      background-color: #EBF4F8;
    }
  }
</style>