const state = {
  isShowPopup: false,
  isShowDialog: false,
  contentHeaderTop: 0,
  dialog: {
    type: 'success',
    message: '',
  },
};

const mutations = {
  togglePopup(state) {
    state.isShowPopup = !state.isShowPopup;
  },
  toggleDialog(state) {
    state.isShowDialog = !state.isShowDialog;
  },
  setDialog(state, payload) {
    state.dialog.type = payload.type;
    state.dialog.message = payload.message;
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
};

export default {
  state,
  mutations,
  actions,
};
