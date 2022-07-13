const state = {
  isShowPopup: false,
  isShowDialog: false,
  isLoading: false,
  contentHeaderTop: 0,
  dialog: {
    type: 'success',
    message: '',
    action: 0, // 0: không có action, 1: Thêm, 2: Sửa, 3: Xóa
  },
};

const mutations = {
  togglePopup(state) {
    state.isShowPopup = !state.isShowPopup;
  },
  toggleDialog(state) {
    state.isShowDialog = !state.isShowDialog;
  },
  toggleLoading(state) {
    state.isLoading = !state.isLoading;
  },
  setDialog(state, payload) {
    state.dialog = payload;
  },
  setContentHeaderTop(state, payload) {
    state.contentHeaderTop = payload;
  },
};

const actions = {
  togglePopup(context) {
    context.commit('togglePopup');
  },
  toggleDialog(context) {
    context.commit('toggleDialog');
  },
  setDialog(context, dialog) {
    context.commit('setDialog', dialog);
  },
  setContentHeaderTop(context, top) {
    context.commit('setContentHeaderTop', top);
  },
  toggleLoading(context) {
    context.commit('toggleLoading');
  },
};

export default {
  state,
  mutations,
  actions,
};
