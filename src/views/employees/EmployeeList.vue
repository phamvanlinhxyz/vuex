<template>
  <!-- Employee page header -->
  <div class="m-content-header" :style="{ top: `${-contentHeaderTop}px` }">
    <div class="m-header-di">
      <div class="m-header-title">Nhân viên</div>
      <button class="m-button m-button-add-emp" @click="openPopupAdd">
        <div class="m-button-text">Thêm mới nhân viên</div>
      </button>
    </div>
  </div>
  <!-- Employee page content -->
  <div class="m-content-body" @scroll="handleContentScroll">
    <!-- Body toolbar -->
    <div class="m-body-toolbar">
      <div class="m-search-area">
        <input
          type="text"
          class="m-input m-input-icon m-input-search m-search-emp"
          placeholder="Tìm theo mã, tên nhân viên"
          @keyup="searchEmployee"
        />
        <div class="m-icon-after m-icon-16 m-icon-search"></div>
      </div>
      <div class="m-refresh-button m-icon-24 m-icon-refresh"></div>
    </div>
    <!-- Body table -->
    <div class="m-body-table">
      <!-- Table -->
      <employee-table-vue />
      <!-- Phân trang -->
      <employee-pagination-vue
        :page="filter.pageNumber"
        :pageSize="filter.pageSize"
      />
    </div>
    <!-- Popup thêm nhân viên -->
    <employee-detail-vue v-if="isShowPopup" />
    <!-- Dialog -->
    <employee-dialog-vue v-if="isShowDialog" />
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "vuex";
import EmployeeDetailVue from "./EmployeeDetail.vue";
import EmployeeDialogVue from "./EmployeeDialog.vue";
import EmployeePaginationVue from "./EmployeePagination.vue";
import EmployeeTableVue from "./EmployeeTable.vue";

export default {
  name: "EmployeeList",
  components: {
    EmployeeDetailVue,
    EmployeeDialogVue,
    EmployeePaginationVue,
    EmployeeTableVue,
  },
  computed: mapState({
    contentHeaderTop: (state) => state.app.contentHeaderTop,
    filter: (state) => state.employee.filter,
    isShowPopup: (state) => state.app.isShowPopup,
    isShowDialog: (state) => state.app.isShowDialog,
  }),
  created() {
    this.getEmployees();
  },
  methods: {
    /**
     * Hàm cập nhật content header top
     * Author: LinhPV (12/07/22)
     */
    handleContentScroll() {
      const scrollTop = document.querySelector(".m-content-body").scrollTop;
      store.dispatch("setContentHeaderTop", scrollTop);
    },
    /**
     * Thay đổi data employees
     * Author: LinhPV (12/07/22)
     */
    getEmployees() {
      store.dispatch("getEmployees");
    },
    /**
     * Đóng hoặc mở popup thêm nhân viên
     * Author: LinhPV (12/07/22)
     */
    togglePopup() {
      store.dispatch("togglePopup");
    },
    /**
     * Người dùng thêm nhân viên mới
     * Author: LinhPV (12/07/22)
     */
    openPopupAdd() {
      store.dispatch("selectEmp", {});
      this.togglePopup();
    },
    searchEmployee(e) {
      store.dispatch("setFilterInfo", {
        pageSize: this.filter.pageSize,
        pageNumber: 1,
        employeeFilter: e.currentTarget.value,
      });
      store.dispatch("getEmployees");
    },
  },
};
</script>