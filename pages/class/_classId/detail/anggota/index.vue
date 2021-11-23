<template>
  <div>
    <crud-header title="Student" :url="'class/'+this.$route.params.classId+'/detail/anggota'" />
    <datatable delete-only url="class/join" :direct="'class/'+this.$route.params.classId+'/detail/join'" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  layout: "detail",
  data() {
    return {
      header: ["name", "phone", "email"],
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
  },
  fetch() {
    this.getAll();
  },
};
</script>