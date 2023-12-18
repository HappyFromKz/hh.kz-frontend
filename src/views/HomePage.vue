<script>
import HeaderUser from "@/components/HeaderUser.vue";

export default {
  name: "HomePage",
  components: {HeaderUser},
  data(){
    return {
      role: localStorage.getItem('role') || '',
      links: [
        {url: '/admin-categories', label: 'Categories', icon: 'pi pi-home'},
      ]
    }
  }
}
</script>

<template>
  <HeaderUser/>
  <router-view/>
</template>

<style scoped>

</style>