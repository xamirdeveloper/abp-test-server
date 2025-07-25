<template>
  <div class="ap-page-wrapper d-flex flex-column justify-center align-center ap-mt-85">
    <div class="position-relative mb-6">
      <icon-circles width="220" height="129" stroke="#4597FF" />
      <div class="icon-wrapper d-flex justify-center align-center">
        <icon-clock width="49" height="49" />
      </div>
    </div>
    <P class="ap-text-primary ap-txt-title-3 mb-2">اطلاعات شما در حال بررسی است.</P>
    <span class="ap-txt-body-1 ap-text-secondary text-center px-12">
      ما در حال بررسی اطلاعات شما هستیم لطفا منتظر دریافت پیامک باشید.
    </span>
  </div>
  <fixed-action-btn
    title="بازگشت به برنامه"
    color="ap-bg-opposite"
    text-color="ap-text-btn-secondary"
  />
</template>

<script lang="ts" setup></script>

<style scoped>
  .ap-mt-85 {
    margin-top: 85px;
  }

  .icon-wrapper {
    width: 120px;
    height: 120px;
    background-color: #4597ff;
    position: absolute;
    top: 0;
    right: 50px;
    left: 50px;
    border-radius: 50%;
  }
</style>
