<script>
export default {
  methods: {
    renderTable(id = "table_id", option) {
      if (process.browser) {
        setTimeout(() => {
          $(`#${id}`).DataTable(option);
        }, 500);
      }
    },
  },
};
</script>
