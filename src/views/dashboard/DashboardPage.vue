<template>
  <div class="m-empty-page">
    <img
      src="https://actappg1.misacdn.net/img/bg_report_nodata.76e50bd8.svg"
      class=""
    />
    <br />
    <div>
      Truy cập trang <router-link to="/employees" class="m-link">Nhân viên</router-link> hoặc <router-link to="/customers" class="m-link">Khách hàng</router-link>
    </div>
  </div>
</template>

<style>
.m-empty-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.m-link {
  color: inherit;
  font-weight: 600;
}
</style>