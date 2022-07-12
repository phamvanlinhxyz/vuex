import { constants } from '@/config';
import axios from 'axios';

const state = {
  isLoadData: true,
  isChangeData: false,
  employees: [],
  totalEmployee: 0,
  totalPage: 0,
  widthTable: 0,
  filter: {
    pageSize: 10,
    pageNumber: 1,
    employeeFilter: '',
  },
  singleEmployee: {},
};

const mutations = {
  changeWidthTable(state, payload) {
    state.widthTable = payload;
  },
  getEmployees(state, payload) {
    state.employees = payload.Data;
    state.totalEmployee = payload.TotalRecord;
    state.totalPage = payload.TotalPage;
    state.isLoadData = false;
    state.isChangeData = false;
  },
  changeData(state) {
    state.isChangeData = true;
  },
  setFilterInfo(state, payload) {
    state.filter = payload;
  },
  selectEmp(state, payload) {
    state.singleEmployee = payload;
  },
};

const actions = {
  changeWidthTable(context, width) {
    context.commit('changeWidthTable', width);
  },
  changeData(context) {
    context.commit('changeData');
  },
  setFilterInfo(context, filter) {
    context.commit('setFilterInfo', filter);
  },
  selectEmp(context, emp) {
    context.commit('selectEmp', emp);
  },
  async getEmployees(context) {
    context.commit('changeData');
    try {
      const res = await axios.get(
        `${constants.API_URL}/Employees/filter?pageSize=${state.filter.pageSize}&pageNumber=${state.filter.pageNumber}&employeeFilter=${state.filter.employeeFilter}`
      );

      context.commit('getEmployees', res.data);
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
