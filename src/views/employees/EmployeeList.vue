<template>
  <!-- Employee page header -->
  <div class="m-content-header" :style="{ top: `${-contentHeaderTop}px` }">
    <div class="m-header-di">
      <div class="m-header-title">Nhân viên</div>
      <div class="m-button-group">
        <button class="m-button" @click="openPopupAdd">
          <div class="m-button-text">Thêm mới nhân viên</div>
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
            m-button
            m-button-radius
            m-dropdown-secondary
            m-button-secondary
            m-flex
            m-align-center
          "
          @click="toggleBulkDrop"
        >
          <div class="m-button-text m-pr-4">Thực hiện hàng loạt</div>
          <div class="m-icon-16 m-icon-arrow-up-black"></div>
        </button>
        <div
          v-if="isShowBulkDrop"
          class="m-close-dropdown"
          @click="() => (this.isShowBulkDrop = false)"
        ></div>
        <div
          class="m-bulk-dropdown"
          v-if="isShowBulkDrop"
          :style="{ top: `${bulkTop}px`, left: `${blukLeft}px` }"
        >
          <ul>
            <li @click="handleBulkDelete">
              <a>Xóa</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="m-toolbar-right">
        <div class="m-search-area">
          <input
            type="text"
            class="m-input m-input-icon m-input-search m-search-emp"
            placeholder="Tìm theo mã, tên nhân viên"
            ref="searchValue"
            @keyup="searchEmployee"
          />
          <div
            class="m-icon-after m-icon-16 m-icon-search"
            @click="searchEmployee"
          ></div>
        </div>
        <div
          class="m-refresh-button m-icon-24 m-icon-refresh"
          @click="reloadData"
          title="Lấy lại dữ liệu"
        ></div>
        <div
          class="m-refresh-button m-icon-24 m-icon-excel"
          @click="exportExcel"
          title="Xuất ra Excel"
        ></div>
      </div>
    </div>
    <!-- Body table -->
    <div class="m-body-table">
      <!-- Table -->
      <employee-table-vue @checkSelectEmp="checkSelectEmp" />
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
import { constants } from "@/config";
import { DialogAction, Gender } from "@/enums";
import { DialogMsg } from "@/resources";
import { mapActions, mapState } from "vuex";
import EmployeeDetailVue from "./EmployeeDetail.vue";
import EmployeeDialogVue from "./EmployeeDialog.vue";
import EmployeePaginationVue from "./EmployeePagination.vue";
import EmployeeTableVue from "./EmployeeTable.vue";
import axios from "axios";
import fileDownload from "js-file-download";

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
    selectedEmployees: (state) => state.employee.selectedEmployees,
  }),
  data() {
    return {
      isStore: false,
      isShowBulkDrop: false,
      bulkTop: 0,
      blukLeft: 0,
      isSelectedEmployee: false,
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
      "bulkDeleteEmployee",
      "setDialog",
      "toggleDialog",
    ]),
    /**
     * Export file excel
     * Author: LinhPV (17/07/22)
     */
    exportExcel() {
      axios
        .get(`${constants.API_URL}/Employees/Export`, { responseType: "blob" })
        .then((res) => {
          fileDownload(res.data, "Danh_sach_nhan_vien.xlsx");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    /**
     * Cập nhật trạng thái có nhân viên nào được select hay không
     * Author: LinhPV (17/07/22)
     * @param {boolean} val
     */
    checkSelectEmp(val) {
      this.isSelectedEmployee = val;
    },
    /**
     * Thực hiện xóa hàng loạt
     * Author: LinhPV (17/07/22)
     */
    handleBulkDelete() {
      try {
        this.setDialog({
          message: DialogMsg.bulkDelete,
          type: "warning",
          action: DialogAction.CONFIRM_BULK_DELETE,
        });
        this.toggleDialog();
        // this.bulkDeleteEmployee();
        this.isShowBulkDrop = false;
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Mở dropdown thực hiện hàng loạt
     * Author: LinhPV (17/07/22)
     * @param {event} e
     */
    toggleBulkDrop(e) {
      if (!this.isShowBulkDrop) {
        let rect = e.currentTarget.getBoundingClientRect();

        this.bulkTop = rect.top + rect.height;
        this.blukLeft = rect.left + rect.width;
      }
      if (this.isSelectedEmployee) {
        this.isShowBulkDrop = !this.isShowBulkDrop;
      }
    },
    /**
     * Load lại dữ liệu trên bảng
     * Author: LinhPV (14/07/22)
     */
    reloadData() {
      try {
        this.setFilterInfo({
          pageSize: this.filter.pageSize,
          pageNumber: 1,
          employeeFilter: "",
        });
        this.getEmployees();
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Hàm cập nhật content header top
     * Author: LinhPV (12/07/22)
     */
    handleContentScroll() {
      try {
        const scrollTop = document.querySelector(".m-content-body").scrollTop;
        this.setContentHeaderTop(scrollTop);
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Người dùng thêm nhân viên mới
     * Author: LinhPV (12/07/22)
     */
    openPopupAdd() {
      try {
        this.selectEmp({ Gender: Gender.MALE });
        this.changeEditMode(1);
        this.togglePopup();
      } catch (error) {
        console.log(error);
      }
    },
    searchEmployee() {
      try {
        this.setFilterInfo({
          pageSize: this.filter.pageSize,
          pageNumber: 1,
          employeeFilter: this.$refs.searchValue.value,
        });
        this.getEmployees();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.m-bulk-dropdown {
  position: fixed;
  height: auto;
  width: auto;
  z-index: 9990;
  transform: translate(-100%);
  transition: opacity 0.25s, transform 0.25s, width 0.3s ease;
}
.m-bulk-dropdown ul {
  background: #fff;
  padding: 2px 1px;
  border-radius: 2px;
  border: 1px solid #babec5;
  position: relative;
  list-style: none;
}
.m-bulk-dropdown li {
  white-space: nowrap;
  transition: all 0.2s ease;
  position: relative;
  z-index: 1000;
  text-align: left;
  width: 100%;
  list-style: none;
  min-width: 100px;
  font-weight: 400 !important;
  font-size: 13px;
}
.m-bulk-dropdown li:hover {
  background: #e8e9ec;
}
.m-bulk-dropdown a {
  background: inherit !important;
  color: inherit !important;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  position: relative;
  display: block;
  color: rgba(0, 0, 0, 0.7);
}
</style>