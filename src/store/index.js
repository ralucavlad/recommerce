import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      postOpened: null,
      postToEdit: null,
    };
  },
  mutations: {
    setPostOpened(state, payload) {
      state.postOpened = payload;
    },
    setPostToEdit(state, payload) {
      state.postToEdit = payload;
    },
  },
  actions: {},
  modules: {},
  getters: {
    postOpened(state) {
      return state.postOpened;
    },
    postToEdit(state) {
      return state.postToEdit;
    },
  },
});
