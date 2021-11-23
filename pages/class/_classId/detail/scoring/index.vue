<template>
  <div>
    <crud-header title="Student not Scoring" :url="'class/'+this.$route.params.classId+'/detail/scoring'" />
    <datatable url="class/scoring" :direct="'class/'+this.$route.params.classId+'/detail/session'" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  layout: "detail",
  data() {
    return {
      header: ["name"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({
        url: "/class/scoring?class=" + this.$route.params.classId,
      });
      this.rows = data;
      this.renderTable();
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>