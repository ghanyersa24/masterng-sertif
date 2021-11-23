<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Class" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-text name="code" :val="payload.code" @get="(val)=>payload.code=val" />
      <input-cms name="description" :val="payload.description" @get="(val)=>payload.description=val" />
      <input-text name="Start Date" type="date" :val="payload.startDate" @get="(val)=>payload.startDate=val" />
      <input-text name="End Date" type="date" :val="payload.endDate" @get="(val)=>payload.endDate=val" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      payload: {
        name: "",
        code: "",
        description: "",
        startDate: this.$moment().format("YYYY-MM-DD"),
        endDate: this.$moment().format("YYYY-MM-DD"),
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "class/" + this.$route.params.id,
      });
      this.payload = request;
    },
    async doSubmit() {
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "class",
          data: { id: this.$route.params.id, ...this.payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestPost({
          url: "class",
          data: this.payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>