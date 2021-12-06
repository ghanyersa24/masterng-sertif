<template>
  <div class="row my-3">
    <div class="col-md-3">
      <label :for="idName" class="text-capitalize h6 mt-3">{{ name }}</label>
    </div>
    <div class="col-md-9">
      <input type="file" @change="change" :placeholder="placeholder" :disabled="disabled" :readonly="disabled" class="form-control" :required="!noRequired">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: String,
    noRequired: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    val: String,
  },
  computed: {
    placeholder() {
      return "Please input " + this.name;
    },
    idName() {
      return this.name.replace(/ /g, "");
    },
  },
  methods: {
    change(e) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      this.$emit("get", { url, file });
    },
  },
};
</script>