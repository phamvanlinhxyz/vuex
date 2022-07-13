<template>
  <div class="m-dialog">
    <div class="m-dialog-box">
      <div class="m-dialog-center">
        <div class="m-dialog-background"></div>
        <div class="m-dialog-drag">
          <div class="m-dialog-message">
            <div class="m-dialog-content">
              <div class="m-content-icon">
                <div class="m-icon-48" :class="icon"></div>
              </div>
              <div class="m-content-message">{{ dialog.message }}</div>
            </div>
            <div class="m-dialog-line"></div>
            <!-- Dialog danger, dialog success -->
            <div
              v-if="(dialog.type == 'danger') | (dialog.type == 'success')"
              class="m-dialog-footer m-flex m-justify-center"
            >
              <button
                class="m-button m-button-size-default m-button-border-false"
                @click="closeDialog"
              >
                <div class="m-button-text">Đóng</div>
              </button>
            </div>
            <!-- Dialog warning -->
            <div
              v-if="dialog.type == 'warning'"
              class="m-dialog-footer m-flex m-justify-between"
            >
              <button
                class="
                  m-button
                  m-button-secondary
                  m-close-delete-warning
                  m-button-size-default
                  m-button-border-false
                "
                @click="closeDialog"
              >
                <div class="m-button-text">Không</div>
              </button>
              <button
                class="
                  m-button
                  m-confirm-delete
                  m-button-size-default
                  m-button-border-false
                "
                @click="confirmClick"
              >
                <div class="m-button-text">Có</div>
              </button>
            </div>
            <!-- Dialog question-->
            <div
              class="m-dialog-footer m-flex m-justify-between"
              v-if="dialog.type == 'question'"
            >
              <div class="m-btn-left">
                <button
                  class="
                    m-button
                    m-button-secondary
                    m-question-cancel
                    m-button-size-default
                    m-button-border-false
                  "
                >
                  <div class="m-button-text">Hủy</div>
                </button>
              </div>
              <div class="m-btn-right">
                <button
                  class="
                    m-button
                    m-button-secondary
                    m-question-close
                    m-button-size-default
                    m-button-border-false
                  "
                  @click="closeDialog"
                >
                  <div class="m-button-text">Không</div>
                </button>
                <button
                  class="
                    m-button
                    m-question-store
                    m-button-size-default
                    m-button-border-false
                    m-ml-8
                  "
                  @click="() => this.$emit('store_emp')"
                >
                  <div class="m-button-text">Cất</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "EmployeeDialog",
  data() {
    return {
      icon: "",
    };
  },
  computed: mapState({
    dialog: (state) => state.app.dialog,
    singleEmployee: (state) => state.employee.singleEmployee,
  }),
  methods: {
    /**
     * Map action
     * Author: LinhPV (13/07/22)
     */
    ...mapActions(["toggleDialog", "deleteEmployee"]),
    /**
     * Đóng dialog
     * Author: LinhPV (13/07/22)
     */
    closeDialog() {
      this.toggleDialog();
    },
    /**
     * Xử lý sự kiện confirm click
     * Author: LinhPV (13/07/22)
     */
    confirmClick() {
      switch (this.dialog.action) {
        // Delete
        case 3:
          // Đóng dialog
          this.toggleDialog();
          // Xóa nhân viên
          this.deleteEmployee(this.singleEmployee.EmployeeId);
      }
    },
  },
  created() {
    this.icon = `m-icon-${this.dialog.type}`;
  },
};
</script>