import httpClient from "@/services/http.service";

const cv = {
    namespaced: true,
    actions: {
        async getCvs({commit}) {
            try {
                const {data, status} = await httpClient.get('cv/');
                if (status == 200) {
                    console.log(data)
                    commit('set_cvs', data)
                }
            } catch (e) {
                console.log(e)
            }
        },
        async postCreateCv({commit}, form) {
            try {
                const {status} = await httpClient.post('cv/', form);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async putUpdateCv({commit}, data) {
            try {
                const {status} = await httpClient.put(`cv/${data.id}`, data);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
        async destroyDeleteCv({commit}, id) {
            try {
                const {status} = await httpClient.delete(`cv/${id}`);
                return status == 200
            } catch (e) {
                console.log(e)
            }
        },
    },
    mutations: {
        set_cvs(state, data){
            state.cvs = data
        }
    },
    state: {
        cvs: []
    },
}

export default cv
