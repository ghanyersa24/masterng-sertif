<template>
  <div>
    <table :id="id" class="table table-hover table-striped">
      <thead>
        <tr>
          <th width="15%">Action</th>
          <th class="text-capitalize" v-for="(item,i) in thead" :key="i">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="i">
          <td>
            <nuxt-link v-if="addView" :to="'/'+to+'/'+row.id+'/detail'" class="btn btn-outline-primary"><i class="fas fa-eye"></i></nuxt-link>

            <nuxt-link v-if="!noEdit" :to="'/'+to+'/'+row.id" class="btn btn-outline-primary"><i class="fas fa-edit"></i></nuxt-link>

            <button v-if="!noDelete" @click="onDelete(row)" type="button" class="btn btn-outline-danger"> <i class="fas fa-trash"></i> </button>
          </td>
          <td v-for="(item,idx) in thead" :key="idx" v-html="row[item]"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "table_id",
    },
    addView: {
      type: Boolean,
      default: false,
    },
    noDelete: {
      type: Boolean,
      default: false,
    },
    noView: {
      type: Boolean,
      default: false,
    },
    noEdit: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
      default: "",
    },
    direct: {
      type: String,
      default: null,
    },
    thead: {
      type: Array,
      default: () => [],
    },
    attrDel: String,
  },
  computed: {
    to() {
      if (this.direct) return this.direct;
      return this.url;
    },
  },
  methods: {
    async onDelete(row) {
      const { isConfirmed } = await this.konfirm(
        "Apakah kamu yakin ingin menghapus " + row[this.attrDel]
      );
      if (isConfirmed) {
        const request = await this.requestDel({ url: this.url + "/" + row.id });
        if (request) {
          this.$emit("onDelete", request);
        }
      }
    },
  },
};
</script>