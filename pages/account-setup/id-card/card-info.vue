<template>
  <page-header
    class="pt-3"
    title="کارت ملی"
    subtitle="لطفا اطلاعات کارت ملی خود را وارد کنید."
    :show-back="true"
    :has-support="false"
  />
  <div class="ap-page-wrapper">
    <label class="d-block ap-txt-label ap-text-primary ap-mb-6">تاریخ پایان اعتبار</label>
    <persian-date-picker
      v-model="date"
      format="YYYY/MM/DD"
      display-format="jYYYY/jMM/jDD"
      locale="fa"
      digits="fa"
      input-class="ap-input__field"
      calendar-class="ap-calendar"
      class="mb-4 d-block"
    />
    <base-input type="number" label="شماره سریال" class="ap-mb-73" />
    <div class="d-flex justify-center px-6 position-relative img-wrap">
      <img
        src="/images/idcard-back.webp"
        width="289"
        height="192"
        alt="idcard"
        class="idcard-img"
      />
      <span class="serial-text ap-bg-surface px-2">شماره سریال</span>
    </div>
  </div>
  <fixed-action-btn title="تایید" />
</template>

<script lang="ts" setup>
  const date = ref();
</script>

<style scoped>
  .ap-mb-73 {
    margin-bottom: 73px;
  }

  .ap-mb-6 {
    margin-bottom: 6px;
  }

  .img-wrap {
    width: fit-content;
  }

  .idcard-img {
    filter: blur(2px);
  }

  .serial-text {
    position: absolute;
    left: 50px;
    top: 5px;
  }
</style>
