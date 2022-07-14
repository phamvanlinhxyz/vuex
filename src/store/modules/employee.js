import { constants } from "@/config";
import axios from "axios";

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
    employeeFilter: "",
  },
  singleEmployee: {},
  employee: {},
  editMode: 0, // 1: Thêm, 2: Sửa, 3: Cất và thêm, 4: Sửa và thêm
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
  loadData(state) {
    state.isLoadData = true;
  },
  changeData(state) {
    state.isChangeData = true;
  },
  setFilterInfo(state, payload) {
    state.filter = payload;
  },
  selectEmp(state, payload) {
    state.singleEmployee = payload;
    state.employee = JSON.parse(JSON.stringify(payload));
  },
  deleteEmployee(state, payload) {
    state.employees = state.employees.filter((employee) => {
      return employee.EmployeeId != payload;
    });
    state.totalEmployee = state.totalEmployee - 1;
  },
  changeEditMode(state, payload) {
    state.editMode = payload;
  },
  setNewEmployeeCode(state, payload) {
    state.singleEmployee.EmployeeCode = payload;
    state.employee.EmployeeCode = payload;
  },
};

const actions = {
  changeWidthTable(context, width) {
    context.commit("changeWidthTable", width);
  },
  changeData(context) {
    context.commit("changeData");
  },
  setFilterInfo(context, filter) {
    context.commit("setFilterInfo", filter);
  },
  selectEmp(context, emp) {
    context.commit("selectEmp", emp);
  },
  loadData(context) {
    context.commit("loadData");
  },
  changeEditMode(context, mode) {
    context.commit("changeEditMode", mode);
  },
  async getEmployees(context) {
    context.commit("changeData");
    try {
      const res = await axios.get(
        `${constants.API_URL}/Employees/filter?pageSize=${state.filter.pageSize}&pageNumber=${state.filter.pageNumber}&employeeFilter=${state.filter.employeeFilter}`
      );

      context.commit("getEmployees", res.data);
    } catch (error) {
      console.error(error);
    }
  },
  async deleteEmployee(context, empId) {
    // Dispatch loading
    context.dispatch("toggleLoading");
    try {
      await axios.delete(`${constants.API_URL}/Employees/${empId}`);

      // Commit lọc data
      context.commit("deleteEmployee", empId);

      // Dispatch thông báo thành công
      context.dispatch("setDialog", {
        type: "success",
        message: "Xóa nhân viên thành công.",
        action: 0,
      });
      context.dispatch("toggleLoading");
      context.dispatch("toggleDialog");
    } catch (error) {
      console.log(error);
    }
  },
  async setNewEmployeeCode(context) {
    try {
      const res = await axios.get(
        `${constants.API_URL}/Employees/NewEmployeeCode`
      );

      context.commit("setNewEmployeeCode", res.data);
    } catch (error) {
      console.log(error);
    }
  },
  async addEmployee(context) {
    // Dispatch loading
    context.dispatch("toggleLoading");
    try {
      await axios.post(`${constants.API_URL}/Employees`, state.employee);

      // Dispatch thông báo thành công
      context.dispatch("setDialog", {
        type: "success",
        message: "Thêm mới nhân viên thành công.",
        action: 0,
      });
      context.dispatch("toggleLoading");
      context.dispatch("toggleDialog");
      context.dispatch("togglePopup");

      // Dispatch load data
      context.dispatch("getEmployees");
    } catch (error) {
      // Dispatch thông báo có lỗi
      context.dispatch("setDialog", {
        type: "danger",
        message: error.response.data.userMsg,
        action: 0,
      });
      context.dispatch("toggleLoading");
      context.dispatch("toggleDialog");
    }
  },
};

export default {
  state,
  mutations,
  actions,
};
