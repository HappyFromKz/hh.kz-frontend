import httpClient from "@/services/http.service";

const employmentType = {
    namespaced: true,
    actions: {
        async getEmploymentTypes({commit}) {
            try {
                const {data, status} = await httpClient.get('employment-type/');
                if (status == 200) {
                    console.log(data)
                    commit('set_employmentTypes', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
    },
    mutations: {
        set_employmentTypes(state, data){
            state.employmentTypes = data
        }
    },
    state: {
        employmentTypes: []
    },
}

export default employmentType
