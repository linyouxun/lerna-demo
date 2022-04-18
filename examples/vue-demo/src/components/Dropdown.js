import Vue from "vue";
import { on, off } from "@/utils/dom.js";
import popper from "@/utils/vue-popper.js";
import { debounce } from "lodash-es";
export default {
  name: "Dropdown",
  props: {
    content: String,
    visibleArrow: {
      default: true,
    },
  },
  mixins: [popper],
  data() {
    return {
      referenceElm: null,
      events: ["mouseenter", "mouseleave"],
      visible: false,
      popperJS: null,
    };
  },
  watch: {
    visible(val) {
      val ? this.updatePopper() : this.destroyPopper();
    },
  },
  beforeCreate() {
    this.popperVM = new Vue({
      data: { node: "" },
      render() {
        return this.node;
      },
    }).$mount();
    window.popperVM = this.popperVM;
  },
  mounted() {
    this.referenceElm = this.$el;
    this.init();
  },
  render() {
    this.popperVM.node = (
      <transition name="" onAfterLeave={this.doDestroy}>
        <div ref="popper" data-name="popper">
          {this.$slots["dropdown-popper"] || this.content}
        </div>
      </transition>
    );
    const node = this.getNode();
    if (!node) {
      console.warn("this dropdown content is empty");
    }
    console.log(this.$refs);
    window.refs = this.$refs;
    return (
      <div ref="popper2" data-name="popper">
        {this.$slots["dropdown-popper"] || this.content}
      </div>
    );
  },
  destroyed() {},
  methods: {
    // dropdown
    getNode() {
      const nodes = this.$slots.default;
      let el = null;
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i] && nodes[i].tag) {
          el = nodes[i];
        }
      }
      return el;
    },
    init() {
      this.events.forEach((eventName) => {
        on(this.referenceElm, eventName, this[eventName]);
      });
    },
    destroyed() {
      this.events.forEach((eventName) => {
        off(this.referenceElm, eventName, this[eventName]);
      });
    },
    mouseenter() {
      this.visible = true;
    },
    mouseleave() {
      this.visible = false;
    },
    doDestroy() {
      // TODO destroy
    },
  },
};
