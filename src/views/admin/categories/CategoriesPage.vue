<template>
  <DataTable :value="categories" tableStyle="min-width: 50rem">
    <Column header="#">
      <template #body="{index}">
        {{ index + 1 }}
      </template>
    </Column>
    <Column field="name" header="Name"></Column>
    <Column v-if="['moderator', 'admin'].includes(role)" field="category" header="Actions">
      <template #body="{data}">
        <Button v-if="['moderator', 'admin'].includes(role)" @click="openModal('Update', data.id)" style="margin-right: 20px;"
                type="button" class="p-button-success mx-2">Change</Button>
        <Button v-if="['admin'].includes(role)" @click="deleteCategory(data.id)" type="button" class="p-button-danger">Delete</Button>
      </template>
    </Column>
  </DataTable>
  <Button v-if="['moderator', 'admin'].includes(role)" @click="openModal('Create')" style="margin-top: 20px;"
          type="button" class="p-button-primary" >Create</Button>

  <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '60vw', '575px': '75vw' }">
    <template #header>
      {{activeModalMethod}} Category
    </template>
    <label>Name:</label><br>
    <InputText type="text" class="form-control mb-2" placeholder="Name" v-model="modalData.name"/>
    <template #footer>
      <Button type="button" class="p-button-secondary" @click="closeModal">Close</Button>
      <Button v-if="activeModalMethod === 'Create'" type="button"
              class="p-button-primary" @click="createCategory">Create</Button>
      <Button v-if="activeModalMethod === 'Update'" type="button"
              class="p-button-primary" @click="updateCategory">Update</Button>
    </template>
  </Dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "CategoriesPage",
  data(){
    return {
      role: localStorage.getItem('role'),
      modalData: {},
      activeModalMethod: '',
      visible: false
    }
  },
  computed: {
    ...mapState('category', ['categories'])
  },
  methods: {
    ...mapActions('category', ['getCategories', 'putUpdateCategory', 'destroyDeleteCategory', 'postCreateCategory']),
    openModal(modalMethod, id = null){
      this.activeModalMethod = modalMethod
      this.visible = true
      id ? this.modalData = {...this.categories.find(i => i.id == id)} : this.modalData = {name: ''}
    },
    closeModal(){
      this.activeModalMethod = ''
      this.modalData = {}
      this.visible = false
    },
    async createCategory(){
      let createRes = await this.postCreateCategory(this.modalData)
      if (createRes){
        await this.getCategories()
        this.closeModal()
      }
    },
    async deleteCategory(id){
      let deleteRes = await this.destroyDeleteCategory(id)
      if (deleteRes){
        await this.getCategories()
      }
    },
    async updateCategory(){
      let updateRes = await this.putUpdateCategory(this.modalData)
      if (updateRes){
        await this.getCategories()
        this.closeModal()
      }
    }
  },
  async mounted() {
    await this.getCategories()
  }
}
</script>

<style scoped>

</style>