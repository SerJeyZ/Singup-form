<template>
  <div class="form-wrap">
    <form class="signup-form" novalidate @submit.prevent="onSingup">
      <h1 class="title signup-form__title">Регистрация</h1>
      <p class="form-text">Уже есть аккаунт?
        <router-link to="#" class="link">Войти</router-link>
      </p>
      <div class="form-group">
        <label class="form-label" for="name">Имя</label>
        <input 
          class="form-control"
          type="text" 
          id="name"
          autocomplete="off"
          placeholder="Введите Ваше имя"
          v-model.trim="$v.name.$model"
          :class="{invalid:($v.name.$dirty&&!$v.name.required||$v.name.$dirty&&!$v.name.testName)}"
        >
        <div class="form-errors" v-if="$v.name.$dirty&&!$v.name.required||$v.name.$dirty&&!$v.name.testName">
          <small 
            class="helper-text invalid"
            v-if="$v.name.$dirty&&!$v.name.required"
          >Введите Ваше имя</small>
          <small 
            class="helper-text invalid"
            v-if="$v.name.$dirty&&$v.name.required&&!$v.name.testName"
          >Поле может содержать буквы, пробелы и "-"</small>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="email">Еmail</label>
        <input
          class="form-control"
          type="text" 
          id="email"
          autocomplete="off" 
          placeholder="Введите ваш email"
          v-model.trim="$v.email.$model"
          :class="{invalid:($v.email.$dirty&&!$v.email.required||$v.email.$dirty&&!$v.email.email)}"
        >
        <div class="form-errors" v-if="$v.email.$dirty&&!$v.email.required||$v.email.$dirty&&!$v.email.email">
          <small 
            class="helper-text invalid"
            v-if="$v.email.$dirty&&!$v.email.required"
          >Введите email</small>
          <small 
            class="helper-text invalid"
            v-if="$v.email.$dirty&&!$v.email.email"
          >Введите корректный email</small>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label" for="phone">Номер телефона</label>
        <input 
          class="form-control"
          type="text" 
          id="phone"
          autocomplete="off"
          placeholder="Введите номер телефона"
          v-model.trim.lazy="$v.phone.$model"
          :class="{invalid:($v.phone.$dirty&&!$v.phone.required||$v.phone.$dirty&&$v.phone.required&&!$v.phone.testPhone)}"
        >
        <div class="form-errors" v-if="$v.phone.$dirty&&!$v.phone.required||$v.phone.$dirty&&$v.phone.required&&!$v.phone.testPhone">
          <small 
            class="helper-text invalid"
            v-if="$v.phone.$dirty&&!$v.phone.required"
          >Введите ваш телефон</small>
          <small 
            class="helper-text invalid"
            v-if="$v.phone.$dirty&&$v.phone.required&&!$v.phone.testPhone"
          >Пример, +7(911)123-11-22</small>
        </div>
        
      </div>
      <div class="form-group">
        <Select
          :id="langSelectOptions.id"
          :value="langSelectOptions.selectValue"
          :placeholder="langSelectOptions.selectPlaceholder"
          :options="langSelectOptions.selectOptions"
          @select="chooseOption"
        />
      </div>
      <div class="form-group agree">
        <label class="checkbox-label">
          <input
            class="checkbox-input"
            type="checkbox"
            v-model="agree"
          >
          <span>Принимаю <a href="#" class="link" @click.prevent="openUserAgreement">условия</a> использования</span>
        </label>
      </div>
      <Button
        type="button"
        name="Зарегистрироваться"
        :disabled="$v.$invalid||langSelectOptions.selectValue.length===0"
        @click="onSingup()"
      />
      
    </form>
  </div>
  
</template>

<script>
import Button from '@/components/Button'
import Select from '@/components/Select'
import { required , email } from 'vuelidate/lib/validators'
export default {
  
  name: 'signup-form',
  components: {
    Select,
    Button
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      lang: '',
      agree:false,
      langSelectOptions: {
        id:'lang',
        selectValue:'',
        selectPlaceholder:'Язык',
        selectOptions:[
          {name:'Русский', val:1},
          {name:'Английский', val:2},
          {name:'Китайский', val:3},
          {name:'Испанский', val:4}
        ]
      }
    }
  },
  methods: {
    chooseOption(option) {
      this.langSelectOptions.selectValue=option.name
    },
    openUserAgreement() {
      console.log("modal open")
    },
    onSingup() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        name: this.name,
        email: this.email,
        phone: this.phone.replace(/\s+/g, ''),
        lang: this.langSelectOptions.selectValue
      }
      // this.$router.push('#')
      console.log(formData)
    }
  },
  validations: {
    name: {required,testName(name){return(/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name))}},
    email: {required,email},
    phone: {required, testPhone(phone) {return (/^(\s*)?(\+)?([- ()]?\d[- ()]?){11}(\s*)?$/.test(phone))}},
    agree:{checked:v=>v}
  } 
}
</script>

<style lang="scss">
  .form-wrap {
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 40px;
    background-color: rgba($color: #6f7886, $alpha: .3);
    &__title {
      margin-bottom: 8px;
    }
  }
  .signup-form {
    width: 100%;
    max-width: 460px;
    padding: 40px 30px;
    border-radius: 24px;
    background-color: #ffffff;
  }
  .title {
    font-weight: bold;
    font-size: 34px;
    line-height: 44px;
    color: #2C2738;
  }
  .form-text {
    margin-bottom: 50px;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #2C2738;
  }
  .link {
    display: inline-block;
    text-decoration: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #0880AE;
    outline: none;
  }
  .form-label {
    display: block;
    margin-bottom: 7px;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    color: #756F86;
  }
  .form-control {
    display: block;
    width: 100%;
    padding: 15px 16px;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #2C2738;
    background: #FFFFFF;
    border: 2px solid #DBE2EA;
    box-sizing: border-box;
    box-shadow: 0px 4px 8px rgba($color: #2c2738, $alpha: .05);
    border-radius: 6px;
    outline: none;
    overflow: hidden;
    &:focus {
      border: 2px solid #0880AE;
      box-shadow: 0px 4px 8px rgba($color: #2c2738, $alpha: .04);
    }
  }
  .form-group {
    position: relative;
    margin-bottom: 10px;
    padding-bottom: 25px;
  }
  .form-errors {
    position: absolute;
    bottom: 0;
    left: 0;
    overflow: hidden;
  }
  .helper-text {
    display: block;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #FF7171;
    white-space: nowrap;
  }
  .checkbox-label {
    display: inline-block;
    cursor: pointer;
    span {
      position: relative;
      display: inline-block;
      padding-left: 38px;
      font-weight: 500;
      font-size: 16px;
      line-height: 32px;
      color: #756F86;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    span::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 28px;
      height: 28px;
      border: 2px solid #DBE2EA;
      box-shadow: 0px 4px 8px rgba($color: #2c2738, $alpha: .04);
      border-radius: 4px;
    }
    span::after {
      content: "";
      position: absolute;
      top: 4px;
      left: 4px;
      display: none;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background: url("../assets/img/checked.svg") no-repeat center center/contain;
      overflow: hidden;
    }
  }
  .checkbox-input {
    display: none;
  }
  .checkbox-input:checked + span::before {
    border: 2px solid #0880AE;
  }
  .checkbox-input:checked + span::after {
    display: block;
  }
  ::-webkit-input-placeholder {
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #7C9CBF;
  }
  ::-moz-placeholder          {
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #7C9CBF;
  }/* Firefox 19+ */
  :-moz-placeholder           {
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #7C9CBF;
  }/* Firefox 18- */
  :-ms-input-placeholder      {
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #7C9CBF;
  }
  .form-control:focus::-webkit-input-placeholder {
    color: transparent
  }

  .form-control:focus::-moz-placeholder {
    color: transparent
  }

  .form-control:focus:-moz-placeholder {
    color: transparent
  }

  .form-control:focus:-ms-input-placeholder {
    color: transparent
  }
  </style>