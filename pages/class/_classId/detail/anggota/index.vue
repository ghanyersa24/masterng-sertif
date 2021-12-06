<template>
  <div>
    <crud-header title="Student" :url="'class/'+this.$route.params.classId+'/detail/anggota'" />
    <datatable no-edit no-view :url="`class/join`" :direct="'class/'+this.$route.params.classId+'/detail/join'" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
    <div class="text-right">
      <button class="btn btn-outline-primary" @click="downloadTemplate" type="button">Download Template</button>
    </div>
  </div>
</template>
<script>
export default {
  layout: "detail",
  data() {
    return {
      header: ["name", "phone", "email", "sertifId"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({
        url: "/class/join?class=" + this.$route.params.classId,
      });
      this.rows = data.map((user) => {
        user.id += "?class=" + this.$route.params.classId;
        return user;
      });
      this.renderTable();
    },
    downloadTemplate() {
      window.open("http://localhost:3000" + `/template/add.xlsx`);
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>