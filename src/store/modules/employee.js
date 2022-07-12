import axios from "axios";

const state = {
  isLoadData: true,
  employees: [],
  totalEmployee: 0,
  totalPage: 0,
};

const mutations = {
  getAllEmployee(state, payload) {
    state.employees = payload.Data;
    state.totalEmployee = payload.TotalRecord;
    state.totalPage = payload.TotalPage;
    state.isLoadData = false;
  },
};

const actions = {
  async getAllEmployee(context, filter) {
    try {
      const res = await axios.get(
        `https://amis.manhnv.net/api/v1/Employees/filter?pageSize=${filter.pageSize}&pageNumber=${filter.pageNumber}&employeeFilter=${filter.employeeFilter}`
      );

      context.commit("getAllEmployee", res.data);
    } catch (error) {
      console.error(error);
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
