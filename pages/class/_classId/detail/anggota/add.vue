<template>
  <div>
    <form @submit.prevent="doSubmit">
      <form-save title="Add Student" />
      <input-file name="file" :val="file" @get="(val)=>{file=val.file;}" />
    </form>
  </div>
</template>
<script>
export default {
  layout: "detail",
  data() {
    return {
      file: "",
    };
  },
  methods: {
    async doSubmit() {
      const request = await this.requestFormData({
        url: "class/join?class=" + this.$route.params.classId,
        data: { file: this.file },
      });
      if (request) {
        this.$router.push(
          "/class/" + this.$route.params.classId + "/detail/anggota"
        );
      }
    },
  },
};
</script>