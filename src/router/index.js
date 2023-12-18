import { createRouter, createWebHistory } from 'vue-router'
import CategoriesPage from "@/views/admin/categories/CategoriesPage.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import ForbiddenPage from "@/views/ForbiddenPage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import RegisterPage from "@/views/auth/RegisterPage.vue";
import HomePage from "@/views/HomePage.vue";
import VacanciesPage from "@/views/general-pages/VacanciesPage.vue";
import UserProfile from "@/views/user/UserProfile.vue";
import VacancyReplies from "@/views/hr/VacancyReplies.vue";

const routes = [
  {
    path: '/',
    name: 'app',
    component: HomePage,
    redirect: '/vacancies',
    children: [
      {
        path: 'admin-categories',
        name: 'admin-categories',
        component: CategoriesPage,
        meta:{
          admin: true,
          hr: true
        }
      },
      {
        path: 'vacancies',
        name: 'vacancies',
        component: VacanciesPage,
      },
      {
        path: 'vacancy-replies/:id',
        name: 'vacancy-replies',
        component: VacancyReplies,
        meta: {
          admin: true,
          hr: true
        }
      },
      {
        path: 'profile',
        name: 'profile',
        component: UserProfile,
      },
      {
        path: 'not-found',
        name: 'not-found',
        component: NotFoundPage
      },
      {
        path: 'forbidden',
        name: 'forbidden',
        component: ForbiddenPage
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const pagesWithoutAuthorization = ['app', 'vacancies', 'vacancy-replies', 'home', 'login', 'register', 'profile', 'forbidden', 'not-found']

router.beforeEach(async (to) => {
  console.log(to)
  if (pagesWithoutAuthorization.includes(to.name)) {
    return true
  }
  if (to.meta[localStorage.getItem('role')]) {
    return true
  }
  if (to.href.includes('user-product')) {
    return true
  }
  return (!to.name) ? {name: 'not-found'} : {name: 'forbidden'}

})

export default router