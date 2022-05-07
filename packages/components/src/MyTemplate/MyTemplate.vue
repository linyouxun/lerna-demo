<template>
  <div>
    template4
  </div>
</template>

<script>
console.log('MyTemplate')
export default {
  name: 'MyTemplate',
  props: {
    name: String
  },
  mounted () {
    console.log('MyTemplate mounted')
    this.init()
  },
  methods: {
    init() {
      console.log('init')
    }
  }
}
</script>
