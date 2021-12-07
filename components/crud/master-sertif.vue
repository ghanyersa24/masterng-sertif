<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Image Master Sertif" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-img name="master sertif" :no-required="payload.url" :val="payload.url" @get="(val)=>{file=val.file;payload.url=val.url}" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      file: null,
      payload: {
        name: null,
        file: null,
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "master-sertif/" + this.$route.params.id,
      });
      this.payload = request;
    },
    async doSubmit() {
      const payload = { ...this.payload };
      if (typeof this.file == "object") {
        payload.file = this.file;
      }
      const request = await this.requestFormData({
        url: "master-sertif",
        data: payload,
      });
      if (request) this.$router.go(-1);
    },
  },
};
</script>