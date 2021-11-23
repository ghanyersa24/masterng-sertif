<template>
  <div>
    <crud-header title="Session" :url="'class/'+this.$route.params.classId+'/detail/session'" />
    <datatable url="session" :direct="'class/'+this.$route.params.classId+'/detail/session'" :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  layout: "detail",
  data() {
    return {
      header: ["sequence", "name"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({
        url: "/session?class=" + this.$route.params.classId,
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