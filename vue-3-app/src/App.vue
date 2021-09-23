<script>
  import Nav from '@/components/Nav.vue';

  export default {
    components: { Nav },
    setup() {
    },
  }
</script>

<template>
    <div>
      <h2>vue-3-app</h2>
      <Nav />

      <router-view/>
    </div>
</template>
