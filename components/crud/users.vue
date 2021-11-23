<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="User" />
      <input-text name="name" :val="payload.name" @get="(val)=>payload.name=val" />
      <input-text name="email" type="email" :val="payload.email" @get="(val)=>payload.email=val" />
      <input-text v-if="!$route.params.id" name="password" type="password" :val="payload.password" @get="(val)=>payload.password=val" />
      <input-text name="phone" type="number" :val="payload.phone" @get="(val)=>payload.phone=val" />
    </form>

  </div>
</template>
<script>
export default {
  data() {
    return {
      payload: {
        name: "",
        email: "",
        password: "",
        role: "admin",
        phone: "",
      },
    };
  },
  created() {
    if (this.$route.params.id) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "user/" + this.$route.params.id,
      });
      this.payload = request;
    },
    async doSubmit() {
      if (this.$route.params.id) {
        const request = await this.requestPut({
          url: "user",
          data: { id: this.$route.params.id, ...this.payload },
        });
        if (request) this.$router.go(-1);
      } else {
        const request = await this.requestPost({
          url: "user",
          data: this.payload,
        });
        if (request) this.$router.go(-1);
      }
    },
  },
};
</script>