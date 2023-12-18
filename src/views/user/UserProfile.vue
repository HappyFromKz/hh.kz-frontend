<script>
import authService from "@/services/auth/auth.service";
import {mapActions, mapState} from "vuex";

export default {
  name: "UserProfile",
  data(){
    return{
      userData: {},
      visible: false,
      activeModalMethod: '',
      modalData: {}
    }
  },
  computed:{
    ...mapState('cv', ['cvs'])
  },
  methods:{
    ...mapActions('cv', ['getCvs', 'postCreateCv', 'putUpdateCv', 'destroyDeleteCv']),
    openModal(modalMethod, id = null){
      this.activeModalMethod = modalMethod
      this.visible = true
      id ? this.modalData = {...this.cvs.find(i => i.id == id)} : this.modalData = {cv_url: ''}
    },
    closeModal(){
      this.activeModalMethod = ''
      this.modalData = {}
      this.visible = false
    },
    async createCv(){
      let createRes = await this.postCreateCv(this.modalData)
      if (createRes){
        await this.getCvs()
        this.closeModal()
      }
    },
    async deleteCv(id){
      let deleteRes = await this.destroyDeleteCv(id)
      if (deleteRes){
        await this.getCvs()
      }
    },
    async updateCv(){
      let updateRes = await this.putUpdateCv(this.modalData)
      if (updateRes){
        await this.getCvs()
        this.closeModal()
      }
    }
  },
  async mounted() {
    let userData = await authService.me()
    try {
      this.userData = userData
    } catch (e){
      console.log(e)
    }
    if (this.userData.role === 'user'){
      await this.getCvs()
    }
  }
}
</script>

<template>
  <Card class="mx-auto mt-5" style="width: 30em">
    <template #title> Name: {{userData.name}} </template>
    <template #subtitle> Email: {{ userData.email }} </template>
    <template #content> Role: {{ userData.role }} </template>
    <template #footer>
      <router-link class="me-2" v-if="userData.role === 'admin'" to="/admin-categories">
        <Button icon="pi pi-user" label="Адним панель" />
      </router-link>
      <router-link v-if="userData.role === 'hr'" to="/admin-categories">
        <Button icon="pi pi-align-justify" label="Мои вакансий" />
      </router-link>
    </template>
  </Card>

  <div v-if="userData.role === 'user'" class="mt-5">
    <h2>Мои резюме:</h2>
    <div class="mt-2 row row-cols-3">
      <Card class="mx-auto p-1" style="width: 30em" v-for="(item, index) in cvs" :key="index">
        <template #header>
          <img alt="user header" style="width: 30em" :src="item.cv_url" />
        </template>
        <template #title> Name: {{userData.name}} </template>
        <template #subtitle> Email: {{ userData.email }} </template>
        <template #footer>
          <Button class="p-button-success" label="Изменить"
                  @click="openModal('Update', item.id)" style="margin-right: 20px;"/>
          <Button class="p-button-danger" label="Удалить" @click="deleteCv(item.id)"/>
        </template>
      </Card>
    </div>
    <Button @click="openModal('Create')" style="margin-top: 20px;"
            type="button" class="p-button-primary" >Создать</Button>
  </div>

  <Dialog v-model:visible="visible" modal header="Cv" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '60vw', '575px': '75vw' }">
    <template #header>
      {{activeModalMethod}} Cv
    </template>
    <label>Name:</label><br>
    <InputText type="text" class="form-control mb-2" placeholder="Name" v-model="modalData.cv_url"/>
    <template #footer>
      <Button type="button" class="p-button-secondary"
              style="margin-right: 20px;" @click="closeModal">Close</Button>
      <Button v-if="activeModalMethod === 'Create'" type="button"
              class="p-button-primary" @click="createCv">Create</Button>
      <Button v-if="activeModalMethod === 'Update'" type="button"
              class="p-button-primary" @click="updateCv">Update</Button>
    </template>
  </Dialog>
</template>

<style scoped>

</style>