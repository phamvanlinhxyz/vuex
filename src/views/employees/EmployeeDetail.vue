<template>
  <div class="m-popup m-add-popup m-dialog">
    <div class="m-popup-con">
      <div class="m-popup-background"></div>
      <div class="m-popup-drag">
        <div class="m-popup m-popup-content">
          <!-- Popup header -->
          <div class="m-popup--header">
            <div class="m-popup--title">
              <div class="m-title">Thông tin nhân viên</div>
              <label class="m-popup-checkbox">
                <input type="checkbox" class="m-input-checkbox-popup" />
                <span class="m-checkbox">
                  <span class="m-checkbox-inner">
                    <div class="m-icon-16 m-icon-checkbox-active"></div>
                  </span>
                </span>
                <span class="m-input-checkbox-label">Là khách hàng</span>
              </label>
              <label class="m-popup-checkbox">
                <input type="checkbox" class="m-input-checkbox-popup" />
                <span class="m-checkbox">
                  <span class="m-checkbox-inner">
                    <div class="m-icon-16 m-icon-checkbox-active"></div>
                  </span>
                </span>
                <span class="m-input-checkbox-label">Là nhà cung cấp</span>
              </label>
            </div>
            <div class="m-popup--close">
              <div
                class="m-icon-24 m-icon-help"
                style="margin-right: 6px"
              ></div>
              <div
                class="m-icon-24 m-icon-close m-close-add-popup"
                title="Đóng (ESC)"
                @click="togglePopup"
              ></div>
            </div>
          </div>
          <!-- Popup content -->
          <div class="m-popup--content">
            <div class="m-popup--content-scroll">
              <form id="employeeForm">
                <div class="m-content-2-col">
                  <div class="m-col-1 m-flex-wrap">
                    <div class="m-input-40 m-pr-6 m-pb-12">
                      <div class="m-flex">
                        <div class="m-input-title">Mã</div>
                        <div class="m-input-title-require">&nbsp;*</div>
                      </div>
                      <input
                        type="text"
                        class="m-input m-input-require"
                        maxlength="25"
                        v-model="employee.EmployeeCode"
                        ref="txtEmployeeCode"
                        :title="
                          validError.txtEmployeeCode
                            ? 'Mã không được để trống.'
                            : null
                        "
                        @keyup="checkInputRequire('txtEmployeeCode', $event)"
                      />
                    </div>
                    <div class="m-input-60 m-pb-12">
                      <div class="m-flex">
                        <div class="m-input-title">Tên</div>
                        <div class="m-input-title-require">&nbsp;*</div>
                      </div>
                      <input
                        type="text"
                        class="m-input m-input-require"
                        maxlength="128"
                        v-model="employee.EmployeeName"
                        ref="txtEmployeeName"
                        :title="
                          validError.txtEmployeeName
                            ? 'Tên không được để trống.'
                            : null
                        "
                        @keyup="checkInputRequire('txtEmployeeName', $event)"
                      />
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex">
                        <div class="m-input-title">Đơn vị</div>
                        <div class="m-input-title-require">&nbsp;*</div>
                      </div>
                      <div class="m-combo-box">
                        <div class="m-combo-main-content" ref="comboDepartment">
                          <div class="m-selected-options">
                            <input
                              type="hidden"
                              ref="txtDepartmentId"
                              v-model="employee.DepartmentId"
                            />
                            <input
                              type="text"
                              class="m-combo-input"
                              ref="txtDepartmentName"
                              v-model="employee.DepartmentName"
                              :title="
                                validError.txtDepartmentName
                                  ? 'Đơn vị không có trong hệ thống.'
                                  : null
                              "
                              @focus="addGreenBorder"
                              @blur="removeGreenBorder"
                              @keyup="checkDepName('txtDepartmentName', $event)"
                            />
                          </div>
                          <div class="m-combo-action m-select-department">
                            <div
                              class="m-btn-dropdown"
                              @click="
                                addGreenBorder();
                                toggleDropdown($event);
                              "
                              ref="buttonDropdown"
                            >
                              <div
                                class="m-icon-16 m-icon-arrow-dropdown"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Chức danh</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        maxlength="128"
                        ref="txtEmployeePosition"
                        v-model="employee.EmployeePosition"
                      />
                    </div>
                  </div>
                  <div class="m-col-2 m-flex-wrap">
                    <div class="m-input-40 m-pr-6 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Ngày sinh</div>
                      </div>

                      <input
                        type="date"
                        class="m-input"
                        ref="dateDateOfBirth"
                        :value="formatDateValue(employee.DateOfBirth)"
                      />
                    </div>
                    <div class="m-input-60 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Giới tính</div>
                      </div>
                      <div class="m-radio-group">
                        <label class="m-con-radio">
                          <input
                            type="radio"
                            class="m-input-radio"
                            value="1"
                            name="Gender"
                            checked
                          />
                          <span class="m-radio">
                            <span class="m-radio-border"></span>
                            <span class="m-radio-circle"></span>
                          </span>
                          <span class="m-radio-label">Nam</span>
                        </label>
                        <label class="m-con-radio">
                          <input
                            type="radio"
                            class="m-input-radio"
                            value="0"
                            name="Gender"
                          />
                          <span class="m-radio">
                            <span class="m-radio-border"></span>
                            <span class="m-radio-circle"></span>
                          </span>
                          <span class="m-radio-label">Nữ</span>
                        </label>
                        <label class="m-con-radio">
                          <input
                            type="radio"
                            class="m-input-radio"
                            value="2"
                            name="Gender"
                          />
                          <span class="m-radio">
                            <span class="m-radio-border"></span>
                            <span class="m-radio-circle"></span>
                          </span>
                          <span class="m-radio-label">Khác</span>
                        </label>
                      </div>
                    </div>
                    <div class="m-input-60 m-pr-6 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Số CMND</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        ref="txtIdentityNumber"
                        maxlength="20"
                        v-model="employee.IdentityNumber"
                        @keyup="checkInputNumber('txtIdentityNumber', $event)"
                        :title="
                          validError.txtIdentityNumber
                            ? 'Giá trị số CMND không đúng.'
                            : null
                        "
                      />
                    </div>
                    <div class="m-input-40 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Ngày cấp</div>
                      </div>
                      <input
                        type="date"
                        class="m-input"
                        ref="dateIdentityDate"
                        :value="formatDateValue(employee.IdentityDate)"
                      />
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Nơi cấp</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        ref="txtIdentityPlace"
                        v-model="employee.IdentityPlace"
                      />
                    </div>
                  </div>
                </div>
                <div class="m-content-1-col m-pb-12">
                  <div class="m-input-100">
                    <div class="m-flex-wrap">
                      <div class="m-input-title">Địa chỉ</div>
                    </div>
                    <input
                      type="text"
                      class="m-input"
                      ref="txtAddress"
                      v-model="employee.Address"
                    />
                  </div>
                </div>
                <div class="m-content-4-col">
                  <div class="m-col-1 m-pr-6">
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">ĐT di động</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        ref="txtTelephoneNumber"
                        v-model="employee.TelephoneNumber"
                        @keyup="checkInputNumber('txtTelephoneNumber', $event)"
                        :title="
                          validError.txtTelephoneNumber
                            ? 'Giá trị ĐT di động không đúng.'
                            : null
                        "
                      />
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Tài khoản ngân hàng</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        ref="txtBankAccountNumber"
                        v-model="employee.BankAccountNumber"
                        @keyup="
                          checkInputNumber('txtBankAccountNumber', $event)
                        "
                        :title="
                          validError.txtBankAccountNumber
                            ? 'Giá trị tài khoản ngân hàng không đúng.'
                            : null
                        "
                      />
                    </div>
                  </div>
                  <div class="m-col-2 m-pr-6">
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">ĐT cố định</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        ref="txtPhoneNumber"
                        v-model="employee.PhoneNumber"
                        @keyup="checkInputNumber('txtPhoneNumber', $event)"
                        :title="
                          validError.txtPhoneNumber
                            ? 'Giá trị ĐT cố định không đúng.'
                            : null
                        "
                      />
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Tên ngân hàng</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        ref="txtBankName"
                        v-model="employee.BankName"
                      />
                    </div>
                  </div>
                  <div class="m-col-3 m-pr-6">
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Email</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        ref="txtEmail"
                        v-model="employee.Email"
                        @keyup="checkEmail"
                        :title="
                          validError.txtEmail
                            ? 'Giá trị email không đúng.'
                            : null
                        "
                      />
                    </div>
                    <div class="m-input-100 m-pb-12">
                      <div class="m-flex-wrap">
                        <div class="m-input-title">Chi nhánh</div>
                      </div>
                      <input
                        type="text"
                        class="m-input"
                        ref="txtBankBranchName"
                        v-model="employee.BankBranchName"
                      />
                    </div>
                  </div>
                  <div class="m-col-4"></div>
                </div>
              </form>
            </div>
            <div class="m-popup--footer">
              <div class="m-divine"></div>
              <div class="m-popup-btn">
                <div class="m-popup-btn-left">
                  <button
                    class="
                      m-button
                      m-button-secondary
                      m-button-size-default
                      m-button-border-false
                    "
                    @click="togglePopup"
                  >
                    <div class="m-button-text">Hủy</div>
                  </button>
                </div>
                <div class="m-popup-btn-right">
                  <button
                    class="
                      m-button
                      m-button-secondary
                      m-button-size-default
                      m-button-border-false
                      m-popup-store-btn
                    "
                    @click="handleStoreEmployee"
                    ref="btnStore"
                  >
                    <div class="m-button-text">Cất</div>
                  </button>
                  <button
                    class="
                      m-button
                      m-button-size-default
                      m-button-border-false
                      m-popup-store-and-add-btn
                    "
                    @click="handleStoreAndAdd"
                  >
                    <div class="m-button-text">Cất và thêm</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Loading -->
          <MLoading v-if="isShowLoading" />
        </div>
      </div>
    </div>
  </div>
  <!-- Combo dropdown chọn phòng ban -->
  <div
    v-if="isShowDropdown"
    class="m-combo-menu m-open"
    style="min-width: 392px"
    :style="{ top: `${dropdownTop}px`, left: `${dropdownLeft}px` }"
  >
    <div class="m-combo-menu-header">
      <table class="m-menu-table">
        <thead class="m-menu-header">
          <tr>
            <th class="m-menu-header-th" style="width: 100px; text-align: left">
              <span>Mã đơn vị</span>
            </th>
            <th class="m-menu-header-th" style="width: 250px; text-align: left">
              <span>Tên đơn vị</span>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <div class="m-combo-menu-content">
      <table class="m-menu-table">
        <tbody class="m-menu-items m-departments-list">
          <tr
            class="m-menu-items-tr"
            v-for="dep in departments"
            :key="dep.DepartmentId"
            :class="{
              'm-items-highlight': dep.DepartmentId == employee.DepartmentId,
            }"
            @click="selectDepartment(dep)"
          >
            <td class="m-menu-items-td" style="width: 100px; text-align: left">
              <span>{{ dep.DepartmentCode }}</span>
            </td>
            <td class="m-menu-items-td" style="width: 250px; text-align: left">
              <span>{{ dep.DepartmentName }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  name: "EmployeeDetail",
  components: {},
  data() {
    return {
      employee: {},
      validError: {},
    };
  },
  computed: mapState({
    singleEmployee: (state) => state.employee.singleEmployee,
  }),
  created() {
    this.employee = this.singleEmployee;
    console.log(this.singleEmployee);
  },
  methods: {
    /**
     * Map Actions
     * Author: LinhPV (13/07/22)
     */
    ...mapActions(["togglePopup"]),
    /**
     * Đong hoặc mở popup
     * Author: LinhPV (12/07/22)
     */
    togglePopup() {
      this.togglePopup();
    },
    /**
     * Format date value cho input
     * Author: LinhPV (12/07/22)
     * @param {string} date
     */
    formatDateValue(date) {
      return date ? moment(date).format("YYYY-MM-DD") : null;
    },
  },
};
</script>