import PopupManager from "./popupManager.js";
let id = 1;
export default {
  data() {
    return {
      id: null,
    };
  },
  beforeMount() {
    this.id = "popper" + id++;
    PopupManager.register(this.id, this);
  },
  beforeDestroy() {
    PopupManager.deregister(this.id);
  },
};
