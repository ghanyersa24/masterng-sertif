<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Session" />
      <input-text name="sequence" type="number" :val="payload.sequence" @get="(val)=>payload.sequence=val" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      payload: {
        name: "",
        sequence: "",
        classId: this.$route.params.classId,
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url:
          "session/" +
          this.$route.params.id +
          "?class=" +
          this.$route.params.classId,
      });
      this.payload = request;
    },
    async doSubmit() {
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "session",
          data: { id: this.$route.params.id, ...this.payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestPost({
          url: "session",
          data: this.payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>