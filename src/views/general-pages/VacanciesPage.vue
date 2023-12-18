<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "VacanciesPage",
  data(){
    return{
      visible: false,
      visibleVacancyReply: false,
      activeModalMethod: '',
      modalData: {},
      vacancyReplyModalData: {},
      role: localStorage.getItem('role')
    }
  },
  computed:{
    ...mapState('vacancy', ['vacancies']),
    ...mapState('category', ['categories']),
    ...mapState('employmentType', ['employmentTypes']),
    ...mapState('cv', ['cvs']),
  },
  methods:{
    ...mapActions('vacancy', ['getVacancies', 'postCreateVacancy', 'putUpdateVacancy', 'destroyDeleteVacancy', "postCreateVacancyReply"]),
    ...mapActions('category', ['getCategories']),
    ...mapActions('employmentType', ['getEmploymentTypes']),
    ...mapActions('cv', ['getCvs']),
    openModal(modalMethod, id = null){
      this.activeModalMethod = modalMethod
      this.visible = true
      if (id){
        let vacancy = this.vacancies.find(i => i.id == id)
        this.modalData = {
          id: vacancy.id,
          name: vacancy.name,
          salary: vacancy.salary,
          category_id: vacancy.category.category_id,
          employment_type_id: vacancy.employment_type.employment_type_id,
          responsibility: vacancy.responsibility,
          requirements: vacancy.requirements,
        }
      } else {
        this.modalData = {
          name: '',
          salary: 0,
          category_id: 0,
          employment_type_id: 0,
          responsibility: '',
          requirements: '',
        }
      }
      console.log(
          this.modalData
      )
    },
    openVacancyReplyModal(vacancy_id){
      this.visibleVacancyReply = true
      this.vacancyReplyModalData = {
        cv_id: 0,
        vacancy_id: vacancy_id,
        covering_letter: ''
      }
    },
    closeVacancyReplyModal(){
      this.vacancyReplyModalData = {}
      this.visibleVacancyReply = false
    },
    closeModal(){
      console.log('closeModal')
      this.activeModalMethod = ''
      this.modalData = {}
      this.visible = false
    },
    async createVacancyReply(){
      let createRes = await this.postCreateVacancyReply(this.vacancyReplyModalData)
      if (createRes){
        await this.getVacancies()
        this.closeVacancyReplyModal()
      }
    },
    async createVacancy(){
      let createRes = await this.postCreateVacancy(this.modalData)
      if (createRes){
        await this.getVacancies()
        this.closeModal()
      }
    },
    async deleteVacancy(id){
      let deleteRes = await this.destroyDeleteVacancy(id)
      if (deleteRes){
        await this.getVacancies()
      }
    },
    async updateVacancy(){
      let updateRes = await this.putUpdateVacancy(this.modalData)
      if (updateRes){
        await this.getVacancies()
        this.closeModal()
      }
    }
  },
  async mounted() {
    await this.getVacancies()
    await this.getCategories()
    await this.getEmploymentTypes()
    await this.getCvs()
  }
}
</script>

<template>
  <div class="container">
    <Button v-if="['admin', 'hr'].includes(role)" @click="openModal('Create')" style="margin-top: 20px;"
            type="button" class="p-button-primary" >Создать</Button>
    <h2 class="text-center">Вакансии:</h2>
    <div class="mt-2 row row-cols-3">
      <div class="p-2 col" v-for="(item, index) in vacancies" :key="index">
        <Card>
          <template #title>
            Название: {{item.name}}
          </template>
          <template #subtitle>
            <b>Зарплата:</b> {{ item.salary }}<br>
            <b>Категория:</b> {{ item.category.category_name }}<br>
            <b>Занятость:</b> {{ item.employment_type.employment_type_name }}
          </template>
          <template #content>
            <h5><b>Ответственность:</b></h5>
            <p>{{ item.responsibility }}</p>
            <h5><b>Обязательства:</b></h5>
            <p>{{item.requirements}}</p>
          </template>
          <template #footer>
            <Button v-if="['user'].includes(role) && item.reply_status !== 1" class="p-button-primary" label="Откликнуться" @click="openVacancyReplyModal(item.id)"/>
            <Button v-if="['admin', 'hr'].includes(role)" class="p-button-success" label="Изменить"
                    @click="openModal('Update', item.id)" style="margin-right: 20px;"/>
            <router-link :to="`vacancy-replies/${item.id}`">
              <Button v-if="['admin', 'hr'].includes(role)" class="p-button-help"
                      label="Отклики" style="margin-right: 20px;"/>
            </router-link>
            <Button v-if="['admin'].includes(role)" class="p-button-danger" label="Удалить" @click="deleteVacancy(item.id)"/>
          </template>
        </Card>
      </div>
    </div>
  </div>

  <Dialog v-model:visible="visible" modal header="Vacancy" :style="{ width: '35rem' }" :breakpoints="{ '1199px': '60vw', '575px': '75vw' }">
    <template #header>
      {{activeModalMethod}} Vacancy
    </template>
    <label>Name:</label><br>
    <InputText type="text" class="mb-2" placeholder="Name" v-model="modalData.name"/><br>
    <label>Salary:</label><br>
    <InputNumber inputId="integeronly" placeholder="Salary" class="mb-2" v-model="modalData.salary"/><br>
    <label>Категория:</label><br>
    <Dropdown v-model="modalData.category_id" :options="categories" optionLabel="name"
              placeholder="Выберите категорию" class="w-full md:w-14rem mb-2" optionValue="id"/><br>
    <label>Тип занятости:</label><br>
    <Dropdown v-model="modalData.employment_type_id" :options="employmentTypes" optionLabel="name"
              placeholder="Выберите тип занятости" class="w-full md:w-14rem mb-2" optionValue="id"/><br>
    <label>Ответственность:</label><br>
    <Textarea type="text" class="mb-2 w-full" placeholder="Ответственность" v-model="modalData.responsibility"/><br>
    <label>Обязательства:</label><br>
    <Textarea type="text" class="mb-2 w-full" placeholder="Обязательства" v-model="modalData.requirements"/><br>
    <template #footer>
      <Button type="button" class="p-button-secondary"
              style="margin-right: 20px;" @click="closeModal">Close</Button>
      <Button v-if="activeModalMethod === 'Create'" type="button"
              class="p-button-primary" @click="createVacancy">Create</Button>
      <Button v-if="activeModalMethod === 'Update'" type="button"
              class="p-button-primary" @click="updateVacancy">Update</Button>
    </template>
  </Dialog>

  <Dialog v-model:visible="visibleVacancyReply" modal header="Vacancy" :style="{ width: '35rem' }" :breakpoints="{ '1199px': '60vw', '575px': '75vw' }">
    <template #header>
      Vacancy Reply
    </template>
    <label>Резюме:</label><br>
    <Dropdown v-model="vacancyReplyModalData.cv_id" :options="cvs" optionValue="id" placeholder="Выберите резюме" class="w-full md:w-14rem">
      <template #value="slotProps">
        <div v-if="slotProps.value" class="flex align-items-center">
          <div>Резюме {{ slotProps.value }}</div>
        </div>
        <span v-else>
            {{ slotProps.placeholder }}
        </span>
      </template>
      <template #option="slotProps">
        <div class="flex flex-row align-items-center">
          <div>Резюме {{ slotProps.option.id }}</div>
        </div>
        <br>
      </template>
    </Dropdown>
    <br>
    <label>Соправадительное письмо:</label><br>
    <Textarea type="text" class="mb-2 w-full" placeholder="Соправадительное письмо" v-model="vacancyReplyModalData.covering_letter"/><br>
    <template #footer>
      <Button type="button" class="p-button-secondary"
              style="margin-right: 20px;" @click="closeVacancyReplyModal">Close</Button>
      <Button type="button" class="p-button-primary" @click="createVacancyReply">Create</Button>
    </template>
  </Dialog>
</template>

<style scoped>

</style>