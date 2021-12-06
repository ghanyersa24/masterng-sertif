<template>
  <div>
    <crud-header title="Student not Scoring" :url="'class/'+this.$route.params.classId+'/detail/scoring'" />
    <datatable url="class/scoring" :direct="'class/'+this.$route.params.classId+'/detail/session'" no-delete no-edit :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
    <div class="text-right">
      <button class="btn btn-outline-primary" @click="downloadTemplate" type="button">Download Template</button>
    </div>

    <br>
    <hr>
    <crud-header no-add title="Student Scoring" :url="'class/'+this.$route.params.classId+'/detail/scoring'" />
    <datatable id="scoring" url="class/scoring" :direct="'class/'+this.$route.params.classId+'/detail/session'" no-edit no-delete :thead="headerScoring" :data="rowsScoring" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  layout: "detail",
  data() {
    return {
      header: ["name"],
      rows: [],
      headerScoring: ["name"],
      rowsScoring: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({
        url: "/class/scoring/no?class=" + this.$route.params.classId,
      });
      this.rows = data;
      this.renderTable();
    },
    async getAllScoring() {
      let headers = [];
      const data = await this.requestGet({
        url: "/class/scoring?class=" + this.$route.params.classId,
      });
      this.rowsScoring = data.map((item) => {
        const tempHeaders = Object.keys(item);
        if (tempHeaders.length > headers.length) {
          headers = tempHeaders;
        }
        return item;
      });
      // delete headers id
      headers.splice(headers.indexOf("id"), 1);
      headers.splice(headers.indexOf("total"), 1);
      headers.push("total");
      this.headerScoring = headers;
      this.renderTable("scoring", { scrollX: true });
    },
    downloadTemplate() {
      window.open(
        "http://localhost:3000" +
          `/class/scoring/template?class=${this.$route.params.classId}`
      );
    },
  },
  fetch() {
    this.getAll();
    this.getAllScoring();
  },
};
</script>