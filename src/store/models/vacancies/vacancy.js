import httpClient from "@/services/http.service";

const vacancy = {
    namespaced: true,
    actions: {
        async getVacancies({commit}) {
            try {
                const {data, status} = await httpClient.get('vacancy/');
                if (status == 200) {
                    console.log(data)
                    commit('set_vacancies', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async getVacancyReplies({commit}, id) {
            try {
                const {data, status} = await httpClient.get(`vacancy-reply/by-vacancy-id?vacancy_id=${id}`);
                if (status == 200) {
                    console.log(data)
                    commit('set_vacancyReplies', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateVacancy({commit}, form) {
            try {
                const {status} = await httpClient.post('vacancy/', form);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateVacancyReply({commit}, form) {
            try {
                const {status} = await httpClient.post('vacancy-reply/', form);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async putUpdateVacancy({commit}, data) {
            try {
                const {status} = await httpClient.put(`vacancy/${data.id}`, data);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async destroyDeleteVacancy({commit}, id) {
            try {
                const {status} = await httpClient.delete(`vacancy/${id}`);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
    },
    mutations: {
        set_vacancies(state, data){
            state.vacancies = data
        },
        set_vacancyReplies(state, data){
            state.vacancyReplies = data
        }
    },
    state: {
        vacancies: [],
        vacancyReplies: []
    },
}

export default vacancy
