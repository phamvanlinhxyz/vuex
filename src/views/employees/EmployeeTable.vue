<template>
  <table class="m-table">
    <thead class="m-thead">
      <tr class="m-tr">
        <th class="m-out-left-white-16" style="top: -78px"></th>
        <th class="m-th m-checkall" style="left: 16px; top: -71px; z-index: 3">
          <label class="m-table-checkbox">
            <input type="checkbox" class="m-input-checkall" />
            <span class="m-checkbox">
              <span class="m-checkbox-inner">
                <div class="m-icon-16 m-icon-checkbox-active"></div>
              </span>
            </span>
          </label>
        </th>
        <th
          class="m-th m-dynamic-col"
          style="min-width: 143px; width: 143px; top: -71px"
        >
          <div class="m-th-title">Mã nhân viên</div>
        </th>
        <th class="m-th m-dynamic-col" style="min-width: 173px; top: -71px">
          <div class="m-th-title">Tên nhân viên</div>
        </th>
        <th
          class="m-th m-dynamic-col"
          style="min-width: 120px; width: 120px; top: -71px"
        >
          <div class="m-th-title">Giới tính</div>
        </th>
        <th
          class="m-th m-dynamic-col"
          style="min-width: 145px; width: 145px; top: -71px"
        >
          <div class="m-th-title">Ngày sinh</div>
        </th>
        <th
          class="m-th m-dynamoc-col"
          style="min-width: 122px; width: 122px; top: -71px"
        >
          <div class="m-th-title">Chức danh</div>
        </th>
        <th
          class="m-th m-dynamic-col"
          style="min-width: 200px; width: 200px; top: -71px"
        >
          <div class="m-th-title">Số CMND</div>
        </th>
        <th class="m-th m-dynamic-col" style="min-width: 250px; top: -71px">
          <div class="m-th-title">Tên đơn vị</div>
        </th>
        <th
          class="m-th m-dynamic-col"
          style="min-width: 150px; width: 150px; top: -71px"
        >
          <div class="m-th-title">Số tài khoản</div>
        </th>
        <th
          class="m-th m-dynamic-col"
          style="min-width: 250px; width: 250px; top: -71px"
        >
          <div class="m-th-title">Tên ngân hàng</div>
        </th>
        <th
          class="m-th m-dynamic-col"
          style="min-width: 250px; width: 250px; top: -71px"
        >
          <div class="m-th-title">Chi nhánh TK ngân hàng</div>
        </th>
        <th
          class="m-th m-dynamic-col"
          style="min-width: 150px; width: 150px; top: -71px"
        >
          <div class="m-th-title">Chi nhánh</div>
        </th>
        <th
          class="m-th m-th-widget"
          style="
            right: 30px;
            width: 120px;
            min-width: 120px;
            top: -71px;
            z-index: 3;
          "
        >
          <div class="m-th-title">Chức năng</div>
        </th>
        <th class="m-out-right-white-30" style="top: -71px"></th>
        <th class="m-out-right-grey-30" style="top: -71px"></th>
      </tr>
    </thead>
    <!-- Người dùng mới load trang -->
    <tbody class="m-tbody" v-if="isLoadData">
      <tr class="m-tr" v-for="i in 4" :key="i">
        <td class="m-out-left-white-16"></td>
        <td class="m-td m-td-multi" style="left: 16px">
          <div class="m-skeleton">
            <div class="m-skeleton-rectangle" style="width: 18px; height: 18px">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>

        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td m-td-widget" style="right: 30px">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-out-right-white-30"></td>
        <td class="m-out-right-grey-30"></td>
      </tr>
    </tbody>
    <!-- Đã load xong dữ liệu -->
    <tbody class="m-tbody" v-if="!isLoadData && !isChangeData">
      <tr class="m-tr" v-for="emp in employees" :key="emp.EmployeeId">
        <td class="m-out-left-white-16"></td>
        <td class="m-td m-td-multi" style="left: 16px">
          <label class="m-table-checkbox">
            <input type="checkbox" class="m-input-checkbox" />
            <span class="m-checkbox">
              <span class="m-checkbox-inner">
                <div class="m-icon-16 m-icon-checkbox-active"></div>
              </span>
            </span>
          </label>
        </td>
        <td class="m-td m-td-emp-code">{{ emp.EmployeeCode }}</td>
        <td class="m-td">{{ emp.EmployeeName }}</td>
        <td class="m-td">{{ emp.GenderName }}</td>
        <td class="m-td">{{ formatDate(emp.DateOfBirth) }}</td>
        <td class="m-td">{{ emp.EmployeePosition }}</td>
        <td class="m-td">{{ emp.IdentityNumber }}</td>
        <td class="m-td">{{ emp.DepartmentName }}</td>
        <td class="m-td">{{ emp.BankAccountNumber }}</td>
        <td class="m-td">{{ emp.BankName }}</td>
        <td class="m-td">{{ emp.BankBranchName }}</td>
        <td class="m-td">{{ emp.BankProvinceName }}</td>
        <td class="m-td m-td-widget" style="right: 30px">
          <div class="m-dropdown">
            <button
              class="
                m-dropdown-type-feature m-dropdown-btn-text m-edit-employee
              "
            >
              <div class="m-btn-text" @click="editEmployee(emp)">Sửa</div>
            </button>
            <button
              class="
                m-dropdown-type-feature m-dropdown-btn-icon m-dropdown-icon-emp
              "
              @click="toggleDropdown(emp, $event)"
            >
              <div class="m-btn-text">
                <div class="m-icon-16 m-icon-arrow-down-blue"></div>
              </div>
            </button>
          </div>
        </td>
        <td class="m-out-right-white-30"></td>
        <td class="m-out-right-grey-30"></td>
      </tr>
    </tbody>
    <!-- Thay đổi dữ liệu trên bảng -->
    <tbody class="m-tbody" v-if="isChangeData">
      <tr class="m-tr" v-for="emp in employees" :key="emp.EmployeeId">
        <td class="m-out-left-white-16"></td>
        <td class="m-td m-td-multi" style="left: 16px">
          <div class="m-skeleton">
            <div class="m-skeleton-rectangle" style="width: 18px; height: 18px">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>

        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-td m-td-widget" style="right: 30px">
          <div class="m-skeleton">
            <div class="m-skeleton-text">
              <div class="m-skeleton-box"></div>
            </div>
          </div>
        </td>
        <td class="m-out-right-white-30"></td>
        <td class="m-out-right-grey-30"></td>
      </tr>
    </tbody>
  </table>
  <!-- Không có nhân viên nào trong bảng -->
  <div
    v-if="!isLoadData && !isChangeData && employees.length == 0"
    class="m-flex"
    style="width: 2189px"
  >
    <div class="m-pagination-bar">
      <img
        src="https://actappg1.misacdn.net/img/bg_report_nodata.76e50bd8.svg"
        class="nodata-img"
      />
    </div>
    <div class="m-out-right-white-30"></div>
    <div class="m-out-right-grey-30"></div>
  </div>
  <!-- Dropdown nhân bản, xóa, ngừng sử dụng -->
  <div
    class="m-dropdown-menu m-dropdown-emp"
    v-if="isShowDropdown"
    :style="{ top: `${dropdownTop}px`, left: `${dropdownLeft}px` }"
  >
    <ul class="m-dropdown-menu-items">
      <li class="m-dropdown-item">
        <a class="m-dropdown-item-link">Nhân bản</a>
      </li>
      <li class="m-dropdown-item m-item-delete" @click="deleteEmp">
        <a class="m-dropdown-item-link">Xóa</a>
      </li>
      <li class="m-dropdown-item">
        <a class="m-dropdown-item-link">Ngừng sử dụng</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "EmployeeTable",
  data() {
    return {
      isShowDropdown: false,
      dropdownTop: 0,
      dropdownLeft: 0,
    };
  },
  computed: mapState({
    employees: (state) => state.employee.employees,
    isLoadData: (state) => state.employee.isLoadData,
    isChangeData: (state) => state.employee.isChangeData,
    singleEmployee: (state) => state.employee.singleEmployee,
  }),
  methods: {
    /**
     * Map action
     * Author: LinhPV (13/07/22)
     */
    ...mapActions([
      "selectEmp",
      "togglePopup",
      "setDialog",
      "toggleDialog",
      "changeWidthTable",
    ]),
    /**
     * Người dùng chọn sửa nhân viên
     * Author: LinhPV (12/07/22)
     */
    editEmployee(emp) {
      this.selectEmp(emp);
      this.togglePopup();
    },
    /**
     * Mở dropdown tùy chọn
     * Author: LinhPV (12/07/22)
     * @param {object} emp
     * @param {event} event
     */
    toggleDropdown(emp, event) {
      if (!this.isShowDropdown) {
        this.selectEmp(emp);
        let rect = event.currentTarget.getBoundingClientRect();
        this.dropdownTop = rect.top + 20;
        this.dropdownLeft = rect.left + 40;
      }
      this.isShowDropdown = !this.isShowDropdown;
    },
    /**
     * Format định dạng ngày tháng
     * Author: LinhPV (12/07/22)
     * @param {string} date
     */
    formatDate(date) {
      return date ? moment(date).format("DD/MM/YYYY") : null;
    },
    /**
     * Người dùng chọn xóa nhân viên
     * Author: LinhPV (13/07/22)
     */
    deleteEmp() {
      // Hiển thị dialog cofirm
      this.setDialog({
        type: "warning",
        message: `Bạn có thực sự muốn xóa Nhân viên <${this.singleEmployee.EmployeeCode}> không?`,
        action: 3,
      });
      this.toggleDialog();
      // Tắt dropdown
      this.isShowDropdown = false;
    },
  },
  updated() {
    // Cập nhật chiều rộng table
    this.changeWidthTable(document.querySelector(".m-table").offsetWidth);
  },
};
</script>