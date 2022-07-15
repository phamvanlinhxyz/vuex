<template>
  <!-- Employee page header -->
  <div class="m-content-header" :style="{ top: `${-contentHeaderTop}px` }">
    <div class="m-header-di">
      <div class="m-header-title">Nhân viên</div>
      <div class="m-button-group">
        <button
          class="
            m-button m-button-radius m-dropdown-secondary m-button-secondary m-flex m-align-center m-mr-12
          "
        >
          <div class="m-button-text m-pr-4">Tiện ích</div>
          <div class="m-icon-16 m-icon-arrow-up-black"></div>
        </button>
        <button class="m-button m-button-add-emp" @click="openPopupAdd">
          <div class="m-button-text">Thêm</div>
        </button>
        <button class="m-button m-button-dropdown">
          <div class="m-button-text m-flex m-justify-center">
            <div class="m-line"></div>
            <div class="m-icon-16 m-icon-arrow-up-white"></div>
          </div>
        </button>
      </div>
    </div>
  </div>
  <!-- Employee page content -->
  <div class="m-content-body" @scroll="handleContentScroll">
    <!-- Body toolbar -->
    <div class="m-body-toolbar">
      <div class="m-toolbar-left">
        <button
          class="
            m-button m-button-radius m-dropdown-secondary m-button-secondary m-flex m-align-center
          "
        >
          <div class="m-button-text m-pr-4">Thực hiện hàng loạt</div>
          <div class="m-icon-16 m-icon-arrow-up-black"></div>
        </button>
      </div>
      <div class="m-toolbar-right">
        <div class="m-search-area">
          <input
            type="text"
            class="m-input m-input-icon m-input-search m-search-emp"
            placeholder="Tìm theo mã, tên nhân viên"
            @keyup="searchEmployee"
          />
          <div class="m-icon-after m-icon-16 m-icon-search"></div>
        </div>
        <div
          class="m-refresh-button m-icon-24 m-icon-refresh"
          @click="reloadData"
        ></div>
        <div class="m-refresh-button m-icon-24 m-icon-excel"></div>
      </div>
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
    <employee-detail-vue
      v-if="isShowPopup"
      :isStore="isStore"
      @isStoreDone="() => (this.isStore = false)"
    />
    <!-- Dialog -->
    <employee-dialog-vue
      v-if="isShowDialog"
      @setIsStore="() => (this.isStore = true)"
    />

  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
  data() {
    return {
      isStore: false,
    };
  },
  created() {
    this.loadData();
    this.getEmployees();
  },
  methods: {
    /**
     * Map actions trong vuex
     * Author: LinhPV (13/07/22)
     */
    ...mapActions([
      // Employee actions
      "getEmployees",
      "setFilterInfo",
      "selectEmp",
      "changeEditMode",
      // App actions
      "loadData",
      "setContentHeaderTop",
      "togglePopup",
    ]),
    /**
     * Load lại dữ liệu trên bảng
     * Author: LinhPV (14/07/22)
     */
    reloadData() {
      this.setFilterInfo({
        pageSize: this.filter.pageSize,
        pageNumber: 1,
        employeeFilter: "",
      });
      this.getEmployees();
    },
    /**
     * Hàm cập nhật content header top
     * Author: LinhPV (12/07/22)
     */
    handleContentScroll() {
      const scrollTop = document.querySelector(".m-content-body").scrollTop;
      this.setContentHeaderTop(scrollTop);
    },
    /**
     * Người dùng thêm nhân viên mới
     * Author: LinhPV (12/07/22)
     */
    openPopupAdd() {
      this.selectEmp({});
      this.changeEditMode(1);
      this.togglePopup();
    },
    searchEmployee(e) {
      this.setFilterInfo({
        pageSize: this.filter.pageSize,
        pageNumber: 1,
        employeeFilter: e.currentTarget.value,
      });
      this.getEmployees();
    },
  },
};
</script>