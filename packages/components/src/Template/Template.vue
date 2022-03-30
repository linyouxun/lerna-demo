<template>
  <div>
    template
  </div>
</template>

<script>
export default {
  name: 'Template',
  props: {
    name: String
  },
  mounted () {
    this.init()
  },
  methods: {
    init() {
      console.log('init')
    }
  }
}
</script>
