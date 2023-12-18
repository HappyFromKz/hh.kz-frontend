<script>
import authService from "@/services/auth/auth.service";

export default {
  name: "HeaderUser",
  data(){
    return {
      username: localStorage.getItem('name')
    }
  },
  methods:{
    logout(){
      authService.logout() ? this.$router.push('/login') : console.log('Error Navbar logout')
    }
  },
  async mounted() {
    let userData = await authService.me()
    try {
      localStorage.setItem('name', userData.name)
      this.username = userData.name
    } catch (e){
      console.log(e)
      authService.logout()
    }
  }
}
</script>

<template>
  <Menubar style="margin-bottom: 20px;">
    <template #start>
      <router-link to="/vacancies">
        <Button type="button" class="p-button-success" style="margin-right: 20px;">hh.kz</Button>
      </router-link>
    </template>
    <template v-if="$route.name !== 'login' && $route.name !== 'register'" #end>
      <div v-if="username">
        <router-link to="/profile">
          <span class="navbar-text me-2" style="font-size: 18px">
            {{ username }}
          </span>
        </router-link>
        <Button @click="logout" type="button" class="p-button-danger">Выйти</Button>
      </div>
      <div v-else>
        <Button @click="logout" type="button" class="p-button-primary">Войти</Button>
      </div>
    </template>
  </Menubar>
</template>

<style scoped>
</style>