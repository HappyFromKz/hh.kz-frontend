<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "VacancyReplies",
  data(){
    return{
      vacancy_id: this.$route.params.id
    }
  },
  computed:{
    ...mapState('vacancy', ['vacancyReplies']),
  },
  methods:{
    ...mapActions('vacancy', ['getVacancyReplies']),
  },
  async mounted() {
    await this.getVacancyReplies(this.vacancy_id)
  }
}
</script>

<template>
  <div class="container" v-if="vacancyReplies.length > 0">
    <Card>
      <template #title> Название: {{vacancyReplies[0].vacancy.name}}
      </template>
      <template #subtitle v-if="vacancyReplies[0].vacancy.category && vacancyReplies[0].vacancy.employment_type">
        <b>Зарплата:</b> {{ vacancyReplies[0].vacancy.salary }}<br>
        <b>Категория:</b> {{ vacancyReplies[0].vacancy.category.category_name }}<br>
        <b>Занятость:</b> {{ vacancyReplies[0].vacancy.employment_type.employment_type_name }}
      </template>
      <template #content>
        <h5><b>Ответственность:</b></h5>
        <p>{{ vacancyReplies[0].vacancy.responsibility }}</p>
        <h5><b>Обязательства:</b></h5>
        <p>{{vacancyReplies[0].vacancy.requirements}}</p>
      </template>
    </Card>
    <h2 class="text-center">Отклики этой вакансии:</h2>
    <div class="mt-2 row row-cols-3">
      <div class="p-2 col" v-for="(item, index) in vacancyReplies" :key="index">
        <Card class="col-12">
          <template #header>
            <img class="col-12"  alt="?" :src="item.cv.cv_url" />
          </template>
          <template #title>
            Название: {{item.cv.user.name}}
          </template>
          <template #subtitle> Email: {{ item.cv.user.email }} </template>
        </Card>
      </div>
    </div>
  </div>
  <div v-else>
    <h1>Вакансии нет</h1>
  </div>
</template>

<style scoped>

</style>