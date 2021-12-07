<template>
  <div>
    <crud-header title="Master Sertif" url="master-sertif" />
    <datatable url="master-sertif" no-edit :thead="header" :data="rows" attrDel="name" @onDelete="(val)=>{getAll()}" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      header: ["name", "img"],
      rows: [],
    };
  },
  methods: {
    async getAll() {
      const data = await this.requestGet({ url: "/master-sertif" });
      this.rows = data.map((item) => {
        return {
          id: item.id,
          name: item.name,
          img: `<img src="${item.url}" width="100" alt="${item.name}"/>`,
        };
      });
      this.renderTable();
    },
  },
  fetch() {
    this.getAll();
  },
};
</script>