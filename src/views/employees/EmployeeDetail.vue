<template>
  <div class="m-popup m-add-popup m-dialog">
    <div class="m-popup-con">
      <div class="m-popup-background"></div>
      <div class="m-popup-drag" ref="dragElm" @mousedown="dragMouseDown">
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
                @click="closePopup"
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
                      <div class="m-combo-box m-combo-department">
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
                                toggleDropdown();
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
                        @change="selectDate('DateOfBirth', $event)"
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
                        @change="selectDate('IdentityDate', $event)"
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
                    @click="closePopup"
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
        </div>
      </div>
    </div>
  </div>
  <!-- Combo dropdown chọn phòng ban -->
  <div
    v-if="isShowDropdown"
    class="m-close-dropdown"
    @click="handleClose"
  ></div>
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
import { formMode } from "@/config";

export default {
  name: "EmployeeDetail",
  data() {
    return {
      dropdownTop: 0,
      dropdownLeft: 0,
      isShowDropdown: false,
      validError: {},
      focus: null,
      positions: {
        clientX: undefined,
        clientY: undefined,
        movementX: 0,
        movementY: 0,
      },
    };
  },
  props: ["isStore"],
  emits: ["isStoreDone"],
  computed: mapState({
    singleEmployee: (state) => state.employee.singleEmployee,
    editMode: (state) => state.employee.editMode,
    employee: (state) => state.employee.employee,
    departments: (state) => state.department.departments,
    isShowDialog: (state) => state.app.isShowDialog,
  }),
  methods: {
    /**
     * Map Actions
     * Author: LinhPV (13/07/22)
     */
    ...mapActions([
      "togglePopup",
      "setNewEmployeeCode",
      "getDepartments",
      "setDialog",
      "toggleDialog",
      "addEmployee",
      "editEmployee",
      "changeEditMode",
    ]),
    dragMouseDown(e) {
      this.positions.clientX = e.clientX;
      this.positions.clientY = e.clientY;
      document.onmousemove = this.handleDrag;
      document.onmouseup = this.closeDrag;
    },
    handleDrag(e) {
      this.positions.movementX = this.positions.clientX - e.clientX;
      this.positions.movementY = this.positions.clientY - e.clientY;
      this.positions.clientX = e.clientX;
      this.positions.clientY = e.clientY;
      // set the element's new position:
      let elm = this.$refs.dragElm;
      let top = elm.offsetTop - this.positions.movementY;
      let left = elm.offsetLeft - this.positions.movementX;
      elm.style.top =
        top < 0
          ? 0
          : top > window.innerHeight - elm.offsetHeight
          ? window.innerHeight - elm.offsetHeight + "px"
          : top + "px";
      elm.style.left =
        left < 0
          ? 0
          : left > window.innerWidth - elm.offsetWidth
          ? window.innerWidth - elm.offsetWidth + "px"
          : left + "px";
    },
    closeDrag() {
      document.onmouseup = null;
      document.onmousemove = null;
    },
    /**
     * Xử lý cất và thêm
     * Author: LinhPV (15/07/22)
     */
    handleStoreAndAdd() {
      var mode =
        this.editMode === formMode.STORE
          ? formMode.STORE_AND_ADD
          : this.editMode === formMode.EDIT
          ? formMode.EDIt_AND_ADD
          : null;
      this.changeEditMode(mode);
      this.handleStoreEmployee();
    },
    handleClose() {
      let comboElm = this.$refs.comboDepartment;
      comboElm.classList.remove("m-input-focus");
      this.isShowDropdown = false;
    },
    /**
     * Xử lý thêm nhân viên
     */
    handleStoreEmployee() {
      const isValid = this.validationData();
      if (isValid) {
        // Xử lý giới tính
        this.employee.Gender = document.querySelector(
          'input[name="Gender"]:checked'
        ).value;
        // Nếu editMode = 1, 3 => Thêm
        if (
          this.editMode === formMode.STORE ||
          this.editMode === formMode.STORE_AND_ADD
        ) {
          this.addEmployee();
          // Nếu editMode = 2, 4 => Sửa
        } else if (
          this.editMode === formMode.EDIT ||
          this.editMode === formMode.EDIt_AND_ADD
        ) {
          this.editEmployee();
        }
      }
    },
    /**
     * Validate dữ liệu người dùng
     * Author: LinhPV (14/07/22)
     */
    validationData() {
      let dataEmployee = this.employee;
      let dialog;
      // 1. Kiểm tra các input bắt buộc
      if (!dataEmployee.EmployeeCode) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "Mã không được bỏ trống.",
          };
          this.focus = this.$refs.txtEmployeeCode;
        }
        this.$refs.txtEmployeeCode.classList.add("m-input-error");
      }
      if (!dataEmployee.EmployeeName) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "Tên không được bỏ trống.",
          };
          this.focus = this.$refs.txtEmployeeName;
        }
        this.$refs.txtEmployeeName.classList.add("m-input-error");
      }
      if (!dataEmployee.DepartmentName) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "Đơn vị không được bỏ trống.",
          };
          this.focus = this.$refs.txtDepartmentName;
        }
        this.$refs.comboDepartment.classList.add("m-input-error");
      }
      // 2. Kiểm tra định dạng ngày tháng
      let dob = this.$refs.dateDateOfBirth.value;
      if (dob && (!moment(dob).isValid() || new Date(dob) - new Date() > 0)) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "Ngày sinh không hợp lệ.",
          };
          this.focus = this.$refs.dateDateOfBirth;
        }
      }
      let idDate = this.$refs.dateIdentityDate.value;
      if (
        idDate &&
        (!moment(idDate).isValid() || new Date(idDate) - new Date() > 0)
      ) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "Ngày cấp không hợp lệ.",
          };
          this.focus = this.$refs.dateIdentityDate;
        }
      }
      // 3. Kiểm tra định dạng email
      let empEmail = this.employee.Email;
      var regex =
        /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+)((\.[a-zA-Z0-9-]{2,3})+)$/;
      if (empEmail && !empEmail.match(regex)) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "Email không hợp lệ.",
          };
          this.focus = this.$refs.txtEmail;
        }
        this.$refs.txtEmail.classList.add("m-input-error");
      }
      // 4. Kiểm tra định dạng các input dạng số
      let idNumber = this.employee.IdentityNumber;
      if (idNumber && isNaN(idNumber)) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "Số CMND không hợp lệ.",
          };
          this.focus = this.$refs.txtIdentityNumber;
        }
        this.$refs.txtIdentityNumber.classList.add("m-input-error");
      }
      let tlphoneNumber = this.employee.TelephoneNumber;
      if (tlphoneNumber && isNaN(tlphoneNumber)) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "ĐT di động không hợp lệ.",
          };
          this.focus = this.$refs.txtTelephoneNumber;
        }
        this.$refs.txtTelephoneNumber.classList.add("m-input-error");
      }
      let phoneNumber = this.employee.PhoneNumber;
      if (phoneNumber && isNaN(phoneNumber)) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "ĐT cố định không hợp lệ.",
          };
          this.focus = this.$refs.txtPhoneNumber;
        }
        this.$refs.txtPhoneNumber.classList.add("m-input-error");
      }
      let bankNumber = this.employee.BankAccountNumber;
      if (bankNumber && isNaN(bankNumber)) {
        if (!dialog) {
          dialog = {
            type: "danger",
            message: "Tài khoản ngân hàng không hợp lệ.",
          };
          this.focus = this.$refs.txtBankAccountNumber;
        }
        this.$refs.txtBankAccountNumber.classList.add("m-input-error");
      }
      // Return
      if (dialog) {
        this.setDialog(dialog);
        this.toggleDialog();
        return false;
      }
      return true;
    },
    /**
     * Check các input dạng số
     * Author: LinhPV (14/07/22)
     */
    checkInputNumber(ref, e) {
      if (!e.currentTarget.value || isNaN(e.currentTarget.value)) {
        e.currentTarget.classList.add("m-input-error");
        this.validError[ref] = true;
      } else {
        e.currentTarget.classList.remove("m-input-error");
        this.validError[ref] = false;
      }
    },
    /**
     * Check email người dùng nhập vào
     * Author: LinhPV (14/07/22)
     */
    checkEmail(e) {
      var regex =
        /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+)@([a-zA-Z0-9-]+)((\.[a-zA-Z0-9-]{2,3})+)$/;
      if (!e.currentTarget.value.match(regex)) {
        e.currentTarget.classList.add("m-input-error");
        this.validError.txtEmail = true;
      } else {
        e.currentTarget.classList.remove("m-input-error");
        this.validError.txtEmail = false;
      }
    },
    /**
     * Người dùng nhập các input dạng ngày tháng
     * Author: LinhPV (14/07/22)
     * @param {string} path
     * @param {event} e
     */
    selectDate(path, e) {
      var val = e.currentTarget.value;
      if (moment(val).isValid() && new Date(val) - new Date() < 0) {
        this.employee[path] = val;
        e.currentTarget.classList.remove("m-input-error");
      } else {
        e.currentTarget.classList.add("m-input-error");
      }
    },
    /**
     * Check các input bắt buộc khi nhập vào
     * Author: LinhPV(14/07/22)
     */
    checkInputRequire(ref, e) {
      if (e.currentTarget.value == "") {
        e.currentTarget.classList.add("m-input-error");
        this.validError[ref] = true;
      } else {
        e.currentTarget.classList.remove("m-input-error");
        this.validError[ref] = false;
      }
    },
    /**
     * Check department name khi người dùng nhập vào
     * Author: LinhPV (14/07/22)
     */
    checkDepName(ref, e) {
      // Gán vị trí dropdown chọn đơn vị
      let rect = this.$refs.buttonDropdown.getBoundingClientRect();
      this.dropdownTop = rect.top + 33;
      this.dropdownLeft = rect.left - 359;
      this.isShowDropdown = true;
      let comboElm = this.$refs.comboDepartment;
      // Lọc đơn vị
      let depName = e.currentTarget.value;
      let findDep = this.departments.find((dep) => {
        return dep.DepartmentName === depName;
      });
      if (!findDep) {
        // Không có đơn vị thỏa mãn
        comboElm.classList.add("m-input-error");
        this.validError[ref] = true;
      } else {
        // Gán đơn vị hợp lệ
        this.employee.DepartmentName = findDep.DepartmentName;
        this.employee.DepartmentId = findDep.DepartmentId;
        comboElm.classList.remove("m-input-error");
        this.validError[ref] = false;
      }
    },
    /**
     * Bỏ border xanh khi người dùng blur khỏi input
     * Author: LinhPV (14/07/22)
     */
    removeGreenBorder() {
      let comboElm = this.$refs.comboDepartment;
      comboElm.classList.remove("m-input-focus");
    },
    /**
     * Người dùng chọn đơn vị
     * Author: LinhPV (14/07/22)
     * @param {object} dep
     */
    selectDepartment(dep) {
      this.employee.DepartmentName = dep.DepartmentName;
      this.employee.DepartmentId = dep.DepartmentId;
      this.isShowDropdown = false;
      let comboElm = this.$refs.comboDepartment;
      comboElm.classList.remove("m-input-error");
      this.validError["txtDepartmentName"] = false;
      this.$refs.txtDepartmentName.focus();
    },
    /**
     * Hiển thị border xanh khi người dùng chọn đơn vị
     * Author: LinhPV (14/07/22)
     */
    addGreenBorder() {
      let comboElm = this.$refs.comboDepartment;
      comboElm.classList.add("m-input-focus");
    },
    /**
     * Người dùng mở dropdown chọn đơn vị
     * Author: LinhPV (14/07/22)
     */
    toggleDropdown() {
      if (!this.isShowDropdown) {
        // Gán vị trí dropdown chọn đơn vị
        let rect = this.$refs.buttonDropdown.getBoundingClientRect();
        this.dropdownTop = rect.top + 33;
        this.dropdownLeft = rect.left - 359;
      }
      this.isShowDropdown = !this.isShowDropdown;
    },
    /**
     * So sánh 2 object
     * Author: LinhPV (14/07/22)
     */
    objectEqual(object1, object2) {
      const keys1 = Object.keys(object1);
      const keys2 = Object.keys(object2);

      // Check số lượng key của 2 object
      if (keys1.length !== keys2.length) {
        return false;
      }

      // Check lần lượt các value
      for (const key of keys1) {
        const val1 = object1[key];
        const val2 = object2[key];
        const areObjects = this.isObject(val1) && this.isObject(val2);

        if (
          (areObjects && !this.objectEqual(val1, val2)) ||
          (!areObjects && val1 !== val2)
        ) {
          return false;
        }
      }

      return true;
    },
    isObject(object) {
      return object != null && typeof object === "object";
    },
    /**
     * Check thông tin thay đổi và đóng popup
     * Author: LinhPV (14/07/22)
     */
    closePopup() {
      // Check dữ liệu trên popup đã thay đổi
      if (!this.objectEqual(this.employee, this.singleEmployee)) {
        this.setDialog({
          type: "question",
          message: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
          action: 1,
        });
        this.toggleDialog();
      } else {
        this.togglePopup();
      }
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
  watch: {
    isShowDialog(newState) {
      if (newState == false && this.focus) {
        this.focus.focus();
      }
    },
    isStore(newState) {
      if (newState == true) {
        this.$refs.btnStore.click();
        this.$emit("isStoreDone");
      }
    },
  },
  created() {
    // Check mode
    if (this.editMode === formMode.STORE) {
      // Gọi API lấy mã mới
      this.setNewEmployeeCode();
    }
    // Gọi API lấy department
    this.getDepartments();
  },
  mounted() {
    // Focus mã nhân viên
    this.$refs.txtEmployeeCode.focus();
    // Xử lý giới tính
    let genderInput = document.querySelector(
      `input[name="Gender"][value="${this.employee.Gender}"]`
    );
    if (genderInput) {
      genderInput.checked = true;
    } else {
      document.querySelector('input[name="Gender"][value="1"]').checked = true;
    }
  },
};
</script>