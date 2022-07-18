import { dialogAction } from "@/config";

const state = {
  isShowPopup: false,
  isShowDialog: false,
  isLoading: false,
  contentHeaderTop: 0,
  dialog: {
    type: "success",
    message: "",
    action: dialogAction.DEFAULT,
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
    context.commit("togglePopup");
  },
  toggleDialog(context) {
    context.commit("toggleDialog");
  },
  setDialog(context, dialog) {
    context.commit("setDialog", dialog);
  },
  setContentHeaderTop(context, top) {
    context.commit("setContentHeaderTop", top);
  },
  toggleLoading(context) {
    context.commit("toggleLoading");
  },
};

export default {
  state,
  mutations,
  actions,
};
