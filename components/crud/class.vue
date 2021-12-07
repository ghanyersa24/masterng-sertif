<template>
  <div>
    <form @submit.prevent="doSubmit">
      {{listSertif}}
      <form-save title="Class" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-text name="Start Date" type="date" :val="payload.startDate" @get="(val)=>payload.startDate=val" />
      <input-text name="End Date" type="date" :val="payload.endDate" @get="(val)=>payload.endDate=val" />
      <input-options name="sertif" :val="payload.sertif" @get="(val)=>payload.sertif=val" :options="listSertif" />
      <input-cms name="description" :val="payload.description" @get="(val)=>payload.description=val" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      listSertif: [],
      payload: {
        name: "",
        sertif: "",
        description: "",
        startDate: this.$moment().format("YYYY-MM-DD"),
        endDate: this.$moment().format("YYYY-MM-DD"),
      },
    };
  },
  created() {
    this.getMasterSertif();
    if (this.$route.params.classId) this.getDetail();
  },
  methods: {
    async getMasterSertif() {
      const request = await this.requestGet({
        url: "master-sertif",
      });
      this.listSertif = request.map((item) => {
        return {
          id: item.url,
          value: item.name,
        };
      });
    },
    async getDetail() {
      const request = await this.requestGet({
        url: "class/" + this.$route.params.classId,
      });
      this.payload = request;
    },
    async doSubmit() {
      if (this.$route.params.classId) {
        const request = await this.requestPut({
          url: "class",
          data: { id: this.$route.params.classId, ...this.payload },
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