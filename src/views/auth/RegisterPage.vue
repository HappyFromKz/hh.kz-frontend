<script>
import authService from "@/services/auth/auth.service";
import HeaderUser from "@/components/HeaderUser.vue";

export default {
  name: "RegisterPage",
  components: {HeaderUser},
  data(){
    return {
      role: localStorage.getItem('role') || '',
      form:{
        password: null,
        passwordConfirm: null,
        email: '',
        last_name_doc: '',
        first_name_doc: '',
        phone_number: '',
        address: ''
      }
    }
  },
  methods:{
    async register(event){
      event.preventDefault();
      if (this.form.password === this.form.passwordConfirm){
        if (await authService.register(this.form)){
          if (await authService.login(this.form)){
            let role = localStorage.getItem('role')
            if(role === 'user'){
              this.$router.push('/vacancies')
            } else if(role === 'admin' || role === 'moderator') {
              this.$router.push('/admin')
            }
          }
        }
      } else {
        alert("Пароли не совпадают")
      }
    }
  },
}
</script>

<template>
  <HeaderUser/>
  <div class="container">
    <div class="row mt-5">
      <Card class="col-6 m-auto">
        <template #title> Register </template>
        <template #content>
          <div class="mx-auto mt-5">
            <form>
              <div>
                <p>ФИО</p>
                <InputText type="text" v-model="form.name" placeholder="ФИО"/>
                <p>Почта</p>
                <InputText type="text" v-model="form.email" placeholder="Почта"/>
                <p>Пароль</p>
                <Password v-model="form.password" toggleMask placeholder="Пароль"/>
                <p>Повторите пароль</p>
                <Password v-model="form.passwordConfirm" toggleMask placeholder="Повторите пароль"/>
              </div>
              <Button @click="register" type="submit" style="margin-top: 20px">Зарегистрироваться</Button>
            </form>
          </div>
          <div class="mt-3">
            <span>Есть аккаунта?</span> <router-link to="/login">Войти</router-link>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<style scoped>

</style>