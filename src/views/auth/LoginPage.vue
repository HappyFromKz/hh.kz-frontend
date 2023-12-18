<template>
  <HeaderUser/>
  <div class="container">
    <div class="row mt-5">
      <Card class="col-6 m-auto">
        <template #title> Login </template>
        <template #content>
            <div class="mx-auto mt-5">
              <div>
                <p>Почта</p>
                <InputText type="text" v-model="form.email" placeholder="Фамилия"/>
                <p>Пароль</p>
                <Password v-model="form.password" toggleMask placeholder="Пароль"/>
              </div>
              <Button @click="login" type="button" style="margin-top: 20px;">Войти</Button>
            </div>
            <span>Нет аккаунта?</span> <router-link to="/register">Создать</router-link>
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import authService from "@/services/auth/auth.service";
import HeaderUser from "@/components/HeaderUser.vue";

export default {
  name: "LoginPage",
  components: {HeaderUser},
  data(){
    return {
      role: localStorage.getItem('role') || '',
      form:{
        password: null,
        email: '',
      }
    }
  },
  methods:{
    async login(){
      if (await authService.login(this.form)){
        this.$router.push('/')
      }
    }
  },
}
</script>

<style scoped>

</style>