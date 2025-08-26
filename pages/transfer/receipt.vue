<template>
  <div class="ap-page-header d-flex justify-space-between ap-mb-30 pt-3">
    <v-btn icon width="40" height="40" variant="text" class="ap-border-1 ap-border-accent-primary">
      <icon-close width="22" height="22" />
    </v-btn>
    <v-btn icon width="40" height="40" variant="text" class="ap-border-1 ap-border-accent-primary">
      <icon-share width="22" height="22" />
    </v-btn>
  </div>
  <div class="ap-page-wrapper">
    <div class="receipt-card">
      <v-card
        variant="text"
        class="ap-bg-surface ap-radius-top-20 pa-5 d-flex flex-column align-center card-inner"
      >
        <div v-if="isSuccess" class="position-relative mb-2">
          <icon-circles width="220" height="129" stroke="var(--ap-success-300)" />
          <div class="icon-wrapper icon-wrapper__success d-flex justify-center align-center">
            <icon-smile width="46" height="40" stroke="var(--ap-text-btn)" />
          </div>
        </div>
        <div v-else class="position-relative mb-2">
          <icon-circles width="220" height="129" stroke="#f10b7c" />
          <div class="icon-wrapper icon-wrapper__fail d-flex justify-center align-center">
            <icon-frown width="46" height="40" stroke="var(--ap-text-btn)" />
          </div>
        </div>
        <div class="d-flex align-center mb-2">
          <span class="ap-txt-title-1 ap-text-primary me-2">۲۵,۲۳۹,۳۲۰</span>
          <span class="ap-txt-body-1 ap-text-secondary">ریال</span>
        </div>
        <div class="d-flex align-center mb-6">
          <icon-tick-circle v-if="isSuccess" class="me-2" width="24" height="24" stroke="#51A471" />
          <icon-close-circle v-else class="me-2" width="21" height="21" stroke="#f10b7c" />
          <span :class="['ap-txt-16 ap-fw-medium', isSuccess ? 'ap-text-success' : 'ap-text-fail']">
            {{ isSuccess ? 'انتقال موفق' : 'انتقال ناموفق' }}
          </span>
        </div>
        <div class="w-100 d-flex justify-space-between align-center ap-py-2 mb-3">
          <span class="ap-txt-body-2 ap-text-secondary ap-me-6">به نام</span>
          <span class="ap-txt-title-4 ap-text-primary">مینا نوروزی</span>
        </div>
        <div class="w-100 d-flex justify-space-between align-center ap-py-2 mb-3">
          <span class="ap-txt-body-2 ap-text-secondary ap-me-6">بانک</span>
          <div class="d-flex align-center">
            <span class="ap-txt-body-1 ap-text-primary me-2">ایران زمین</span>
            <img src="@/assets/images/Saman.svg" alt="bank logo" width="26" height="26" />
          </div>
        </div>
        <div class="w-100 d-flex justify-space-between align-center ap-py-2 mb-3">
          <span class="ap-txt-body-2 ap-text-secondary ap-me-6">شماره شبا</span>
          <span class="ap-txt-body-1 ap-text-primary">IR ۸۱۲۶۳۸۷۱۶۲۸۷۳۵۱۲</span>
        </div>
        <div class="w-100 d-flex justify-space-between align-center ap-py-2 mb-3">
          <span class="ap-txt-body-2 ap-text-secondary ap-me-6">انتقال دهنده</span>
          <span class="ap-txt-body-1 ap-text-primary">مینا نوروزی</span>
        </div>
        <div class="w-100 d-flex justify-space-between align-center ap-py-2 mb-3">
          <span class="ap-txt-body-2 ap-text-secondary ap-me-6">سپرده مبدا</span>
          <span class="ap-txt-body-1 ap-text-primary">IR ۸۱۲۶۳۸۷۱۶۲۸۷۳۵۱۲</span>
        </div>
        <div class="w-100 d-flex justify-space-between align-center ap-py-2 mb-3">
          <span class="ap-txt-body-2 ap-text-secondary ap-me-6">کارمزد</span>
          <span class="ap-txt-body-1 ap-text-primary">بدون کارمزد</span>
        </div>
        <v-divider class="w-100" />
        <div class="w-100 d-flex justify-space-between align-center py-3">
          <span class="ap-txt-body-2 ap-text-secondary ap-me-6">شماره پیگیری</span>
          <span class="ap-txt-body-1 ap-text-primary">۸۷۳۵۱۲</span>
        </div>
      </v-card>
      <!-- <svg
        class="card-subtract"
        xmlns="http://www.w3.org/2000/svg"
        width="351"
        height="42"
        viewBox="0 0 351 42"
        fill="none"
      >
        <g filter="url(#filter0_d_2890_8711)">
          <path
            d="M343 26.0791H341.855C341.828 25.9308 341.785 25.7815 341.722 25.6348L338.32 17.7783C337.624 16.1712 335.345 16.1712 334.649 17.7783L331.248 25.6348C331.185 25.7815 331.141 25.9308 331.114 26.0791H330.691C330.664 25.9308 330.621 25.7815 330.558 25.6348L327.156 17.7783C326.46 16.1712 324.181 16.1712 323.485 17.7783L320.083 25.6348C320.019 25.7816 319.976 25.9307 319.949 26.0791H319.522C319.495 25.9308 319.452 25.7815 319.389 25.6348L315.987 17.7783C315.291 16.1712 313.012 16.1712 312.316 17.7783L308.915 25.6348C308.852 25.7815 308.808 25.9308 308.781 26.0791H308.356C308.329 25.9308 308.286 25.7816 308.223 25.6348L304.82 17.7783C304.124 16.1713 301.845 16.1712 301.149 17.7783L297.748 25.6348C297.685 25.7815 297.641 25.9308 297.614 26.0791H297.189C297.162 25.9308 297.119 25.7815 297.056 25.6348L293.654 17.7783C292.958 16.1712 290.679 16.1712 289.983 17.7783L286.582 25.6348C286.518 25.7815 286.475 25.9308 286.448 26.0791H286.024C285.997 25.9307 285.954 25.7816 285.891 25.6348L282.488 17.7783C281.792 16.1713 279.513 16.1712 278.817 17.7783L275.416 25.6348C275.352 25.7815 275.309 25.9308 275.282 26.0791H274.856C274.829 25.9308 274.786 25.7815 274.723 25.6348L271.321 17.7783C270.625 16.1712 268.346 16.1713 267.65 17.7783L264.248 25.6348C264.184 25.7816 264.141 25.9308 264.114 26.0791H263.689C263.662 25.9308 263.619 25.7815 263.556 25.6348L260.154 17.7783C259.458 16.1712 257.179 16.1712 256.483 17.7783L253.082 25.6348C253.018 25.7815 252.975 25.9308 252.948 26.0791H252.523C252.496 25.9308 252.453 25.7816 252.39 25.6348L248.987 17.7783C248.291 16.1714 246.013 16.1714 245.317 17.7783L241.915 25.6348C241.851 25.7815 241.808 25.9308 241.781 26.0791H241.357C241.33 25.9308 241.287 25.7815 241.224 25.6348L237.822 17.7783C237.126 16.1712 234.847 16.1712 234.151 17.7783L230.75 25.6348C230.686 25.7815 230.643 25.9308 230.616 26.0791H230.19C230.163 25.9307 230.12 25.7816 230.057 25.6348L226.654 17.7783C225.958 16.1712 223.679 16.1712 222.983 17.7783L219.582 25.6348C219.518 25.7815 219.475 25.9308 219.448 26.0791H219.024C218.997 25.9308 218.954 25.7815 218.891 25.6348L215.489 17.7783C214.793 16.1712 212.514 16.1712 211.818 17.7783L208.416 25.6348C208.352 25.7816 208.309 25.9307 208.282 26.0791H207.857C207.83 25.9308 207.787 25.7815 207.724 25.6348L204.322 17.7783C203.626 16.1712 201.347 16.1712 200.651 17.7783L197.25 25.6348C197.186 25.7815 197.143 25.9308 197.116 26.0791H196.69C196.663 25.9308 196.62 25.7816 196.557 25.6348L193.154 17.7783C192.458 16.1714 190.18 16.1714 189.484 17.7783L186.082 25.6348C186.018 25.7815 185.975 25.9308 185.948 26.0791H185.523C185.496 25.9308 185.453 25.7815 185.39 25.6348L181.988 17.7783C181.292 16.1712 179.013 16.1712 178.317 17.7783L174.916 25.6348C174.852 25.7815 174.809 25.9308 174.782 26.0791H174.357C174.33 25.9307 174.287 25.7816 174.224 25.6348L170.821 17.7783C170.125 16.1712 167.846 16.1712 167.15 17.7783L163.749 25.6348C163.685 25.7815 163.642 25.9308 163.615 26.0791H163.19C163.163 25.9308 163.12 25.7815 163.057 25.6348L159.655 17.7783C158.959 16.1712 156.68 16.1713 155.984 17.7783L152.582 25.6348C152.518 25.7816 152.475 25.9307 152.448 26.0791H152.022C151.995 25.9308 151.952 25.7815 151.889 25.6348L148.487 17.7783C147.791 16.1712 145.512 16.1712 144.816 17.7783L141.415 25.6348C141.352 25.7815 141.308 25.9308 141.281 26.0791H140.857C140.83 25.9308 140.787 25.7815 140.724 25.6348L137.321 17.7783C136.625 16.1714 134.347 16.1714 133.651 17.7783L130.249 25.6348C130.185 25.7815 130.142 25.9308 130.115 26.0791H129.689C129.662 25.9308 129.619 25.7815 129.556 25.6348L126.154 17.7783C125.458 16.1712 123.179 16.1712 122.483 17.7783L119.082 25.6348C119.018 25.7815 118.975 25.9308 118.948 26.0791H118.524C118.497 25.9307 118.454 25.7816 118.391 25.6348L114.988 17.7783C114.292 16.1713 112.013 16.1712 111.317 17.7783L107.916 25.6348C107.852 25.7815 107.809 25.9308 107.782 26.0791H107.357C107.33 25.9308 107.287 25.7815 107.224 25.6348L103.822 17.7783C103.126 16.1712 100.847 16.1713 100.151 17.7783L96.749 25.6348C96.6855 25.7816 96.6422 25.9307 96.6152 26.0791H96.1895C96.1625 25.9308 96.1192 25.7815 96.0557 25.6348L92.6543 17.7783C91.9585 16.1712 89.6792 16.1712 88.9834 17.7783L85.582 25.6348C85.5185 25.7815 85.4752 25.9308 85.4482 26.0791H85.0234C84.9965 25.9308 84.9532 25.7816 84.8896 25.6348L81.4873 17.7783C80.7914 16.1714 78.5133 16.1714 77.8174 17.7783L74.415 25.6348C74.3515 25.7815 74.3082 25.9308 74.2812 26.0791H73.8564C73.8295 25.9308 73.7862 25.7815 73.7227 25.6348L70.3213 17.7783C69.6255 16.1712 67.3462 16.1712 66.6504 17.7783L63.249 25.6348C63.1855 25.7815 63.1422 25.9308 63.1152 26.0791H62.6904C62.6635 25.9307 62.6202 25.7816 62.5566 25.6348L59.1543 17.7783C58.4584 16.1712 56.1792 16.1712 55.4834 17.7783L52.082 25.6348C52.0185 25.7815 51.9752 25.9308 51.9482 26.0791H51.5244C51.4974 25.9308 51.4542 25.7815 51.3906 25.6348L47.9893 17.7783C47.2934 16.1712 45.0142 16.1713 44.3184 17.7783L40.916 25.6348C40.8525 25.7816 40.8092 25.9307 40.7822 26.0791H40.3574C40.3304 25.9308 40.2872 25.7815 40.2236 25.6348L36.8223 17.7783C36.1264 16.1712 33.8472 16.1712 33.1514 17.7783L29.75 25.6348C29.6865 25.7815 29.6432 25.9308 29.6162 26.0791H29.1904C29.1635 25.9308 29.1202 25.7816 29.0566 25.6348L25.6543 17.7783C24.9584 16.1714 22.6803 16.1714 21.9844 17.7783L18.582 25.6348C18.5185 25.7815 18.4752 25.9308 18.4482 26.0791H18.0234C17.9965 25.9308 17.9532 25.7815 17.8896 25.6348L14.4883 17.7783C13.7924 16.1712 11.5132 16.1712 10.8174 17.7783L8 24.2852V1H343V26.0791Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_2890_8711"
            x="0"
            y="0"
            width="351"
            height="41.0791"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="7" />
            <feGaussianBlur stdDeviation="4" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.87451 0 0 0 0 0.882353 0 0 0 0 0.905882 0 0 0 1 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2890_8711" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_2890_8711"
              result="shape"
            />
          </filter>
        </defs>
      </svg> -->
      <img src="@/assets/images/subtract.svg" class="card-subtract" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const isSuccess = ref<boolean>(true);
</script>

<style scoped lang="scss">
  .ap-page-wrapper {
    overflow-y: auto;
    scroll-behavior: smooth;
    flex: 1;
  }

  .receipt-card {
    position: relative;
  }

  .card-subtract {
    position: absolute;
    bottom: -14px;
    left: 0;
    width: 100%;
    height: auto;
    z-index: 1;
  }

  .ap-mb-30 {
    margin-bottom: 30px;
  }

  .ap-py-2 {
    padding-top: 2px;
    padding-bottom: 2px;
  }

  .icon-wrapper {
    width: 120px;
    height: 120px;
    position: absolute;
    top: 0;
    right: 50px;
    left: 50px;
    border-radius: 50%;

    &__success {
      background-color: var(--ap-success-300);
    }

    &__fail {
      background-color: #f10b7c;
    }
  }

  .ap-text-success {
    color: #51a471;
  }

  .ap-text-fail {
    color: #f10b7c;
  }
</style>
