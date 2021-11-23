<template>
  <div>
    <div class="main-wrapper">
      <partials-navbar />
      <partials-sidebar />
      <!-- Main Content -->
      <div class="main-content">
        <section class="section">
          <div class="section-header">
            <h1>:: {{APP_NAME}} :: </h1>
          </div>
          <div class="section-body">
            <div class="card card-primary rounded">
              <div class="card-body">
                <div class="jumbotron">
                  <h1 class="display-4">{{payload.name}}!</h1>
                  <p class="lead" v-html="payload.description"></p>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">
                        <nuxt-link class="nav-link" :to="`/class/${$route.params.classId}/detail`">Kelas</nuxt-link>
                      </li>
                      <li class="list-group-item">
                        <nuxt-link class="nav-link" :to="`/class/${$route.params.classId}/detail/session`">Session</nuxt-link>
                      </li>
                      <li class="list-group-item">
                        <nuxt-link class="nav-link" :to="`/class/${$route.params.classId}/detail/anggota`">Anggota</nuxt-link>
                      </li>
                      <li class="list-group-item">
                        <nuxt-link class="nav-link" :to="`/class/${$route.params.classId}/detail/scoring`">Scoring</nuxt-link>
                      </li>
                    </ul>
                  </div>
                  <div class="col-md-9">
                    <Nuxt />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <partials-footer />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payload: {
        name: "",
        code: "",
        description: "",
        startDate: this.$moment().format("YYYY-MM-DD"),
        endDate: this.$moment().format("YYYY-MM-DD"),
      },
    };
  },
  mounted() {
    if (this.$route.params.classId) this.getDetail();
  },
  methods: {
    async getDetail() {
      const request = await this.requestGet({
        url: "class/" + this.$route.params.classId,
      });
      this.payload = request;
    },
  },
};
</script>