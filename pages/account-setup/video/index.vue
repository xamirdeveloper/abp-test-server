<template>
  <page-header
    class="pt-3"
    title="ضبط ویدیو"
    subtitle="لطفا موارد زیر را رعایت کنید."
    :show-back="true"
  />
  <div class="ap-page-wrapper">
    <img
      src="/images/video-recording.webp"
      width="335"
      height="337"
      alt="sample image"
      class="sample-img mb-7"
    />
    <ul class="px-9">
      <li class="ap-txt-body-1 ap-text-secondary">بدون کلاه و عینک آفتابی</li>
      <li class="ap-txt-body-1 ap-text-secondary">در نور مناسب</li>
      <li class="ap-txt-body-1 ap-text-secondary">با رعایت حجاب اسلامی</li>
      <li class="ap-txt-body-1 ap-text-secondary">با رعایت فاصله مناسب از دوربین</li>
    </ul>
  </div>
  <fixed-action-btn title="من آماده ام" />
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
  .ap-page-wrapper {
    height: calc(100% - 210px);
    overflow-y: auto;
  }

  .sample-img {
    min-width: 100%;
    height: auto;
    border-radius: 20px;
  }
</style>
