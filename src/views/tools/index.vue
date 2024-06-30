<script setup name="tools">
import { getListApi, getListApiError } from "@/api/mock";
// import { showFailToast, showSuccessToast } from "vant";
import "vant/es/toast/style";

const dataInfo = ref('');
const { t } = useI18n();

const handleSuccessReq = async () => {
  const data = await getListApi();
  showSuccessToast(t('tools.reqOK'));
  dataInfo.value += data
};
const handleErrorReq = () => {
  getListApiError().then(
    () => { },
    err => {
      console.error(err);
      showFailToast(t('tools.reqErr'));
    }
  );
};
</script>

<template>
  <div overflow-y-auto p-2 class="h100%">

    <div>
      <van-space direction="vertical" fill>
        <van-button class="w100%" type="success" @click="handleSuccessReq">{{ t('tools.successBtn') }}</van-button>
        <van-button class="w100%" type="danger" @click="handleErrorReq">{{ t('tools.errorBtn') }}</van-button>
      </van-space>
      <div text-size-2 break-all>
        {{ dataInfo }}
      </div>
    </div>
    <div flex flex-col items-center v-for="i in 30">{{ i }}</div>
  </div>
</template>
