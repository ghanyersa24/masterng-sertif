<template>
  <div class="main-sidebar">
    <aside id="sidebar-wrapper">
      <div class="sidebar-brand">
        <nuxt-link to="/">Admin Panel</nuxt-link>
      </div>
      <div class="sidebar-brand sidebar-brand-sm">
        <nuxt-link to="/">AP</nuxt-link>
      </div>
      <ul class="sidebar-menu">
        <li v-for="(menu,i) in menus" :key="i" :class="'nav-item '+menu.dropdown?'dropdown':''">
          <a v-if="menu.dropdown " href="#" class="nav-link has-dropdown" data-toggle="dropdown">
            <i :class="menu.icon"></i> <span>{{menu.name}}</span>
          </a>
          <ul v-if="menu.dropdown" class="dropdown-menu">
            <li v-for="(item,i) in menu.menus" :key="i" v-show="item.role.includes($auth.user.role)">
              <nuxt-link :to="item.link" class="nav-link">
                <i :class="item.icon" style="font-size:1.2em"></i> <span>{{item.name}}</span>
              </nuxt-link>
            </li>
          </ul>
          <nuxt-link v-if="!menu.dropdown" :to="menu.link" class="nav-link">
            <i :class="menu.icon" style="font-size:1.2em"></i> <span>{{menu.name}}</span>
          </nuxt-link>
        </li>
      </ul>
    </aside>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menus: [
        {
          icon: "fab fa-dashcube",
          name: "Dashboard",
          link: "/",
          // role: ["writer", "admin"],
        },
        {
          icon: "fas fa-users-cog",
          name: "Users",
          link: "/users",
          // role: ["admin"],
        },
      ],
    };
  },
};
</script>