<template>
  <div class="home">
    <!-- <Dropdown>
      <span>Dropdown</span>
      <div slot="dropdown-popper">dropdown-popper</div>
    </Dropdown>
    <div>q</div>
    <div>w</div>
    <div>e</div> -->
    <MyTemplate name="222"/>
    <HelloWorld msg="2222"/> 
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Com from "@xyym/components";
// console.log(HelloWorld)

export default {
  name: "Home",
  components: {
    // Dropdown,
    [Com.MyTemplate.name]: Com.MyTemplate,
    [Com.HelloWorld.name]: Com.HelloWorld,
  },
};
</script>
