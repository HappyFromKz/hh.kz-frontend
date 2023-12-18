import { createStore } from 'vuex'
import category from "@/store/models/category/category";
import cv from "@/store/models/cv/cv";
import vacancy from "@/store/models/vacancies/vacancy";
import employmentType from "@/store/models/employment-type/employment-type";

export default createStore({
  modules: {
    category,
    cv,
    vacancy,
    employmentType
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
})
