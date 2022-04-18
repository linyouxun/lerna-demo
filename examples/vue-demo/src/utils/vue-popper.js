const PopperJS = require("./popper.js");
const stop = (e) => e.stopPropagation();
export default {
  props: {
    visibleArrow: Boolean,
    appendToBody: {
      type: Boolean,
      default: true,
    },
    transformOrigin: {
      type: [Boolean, String],
      default: true,
    },
  },
  data() {
    return {
      appended: false,
    };
  },
  methods: {
    // popper
    createPopper() {
      const popper = (this.popperElm =
        this.popperElm || this.popper || this.$refs.popper);
      let reference = (this.referenceElm =
        this.referenceElm || this.reference || this.$refs.reference);
      console.log(popper, reference);
      if (!popper || !reference) return;
      if (this.visibleArrow) this.appendArrow(popper);
      if (this.appendToBody) document.body.appendChild(this.popperElm);
      this.popperJS = new PopperJS(reference, popper);
      this.popperJS.onCreate((_) => {
        this.$emit("created", this);
        this.resetTransformOrigin();
        this.$nextTick(this.updatePopper);
      });
    },
    updatePopper() {
      const popperJS = this.popperJS;
      if (popperJS) {
        popperJS.update();
      } else {
        this.createPopper();
      }
    },
    destroyPopper() {
      if (this.popperJS) {
        this.resetTransformOrigin();
      }
    },
    appendArrow(el) {
      if (this.appended) {
        return;
      }
      this.appended = true;
      const arrow = document.createElement("div");
      arrow.className = "popper__arrow";
      el.appendChild(arrow);
    },
    resetTransformOrigin() {
      if (!this.transformOrigin) return;
      let placementMap = {
        top: "bottom",
        bottom: "top",
        left: "right",
        right: "left",
      };
      let placement = this.popperJS._popper
        .getAttribute("x-placement")
        .split("-")[0];
      let origin = placementMap[placement];
      this.popperJS._popper.style.transformOrigin =
        typeof this.transformOrigin === "string"
          ? this.transformOrigin
          : ["top", "bottom"].indexOf(placement) > -1
          ? `center ${origin}`
          : `${origin} center`;
    },
    beforeDestroy() {
      this.doDestroy();
      if (this.popperElm && this.popperElm.parentNode === document.body) {
        this.popperElm.removeEventListener("click", stop);
        document.body.removeChild(this.popperElm);
      }
    },
    doDestroy() {
      if (!this.popperJS) return;
      this.popperJS.destroy();
      this.popperJS = null;
    },
  },
};
