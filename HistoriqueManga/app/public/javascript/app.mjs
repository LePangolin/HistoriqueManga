import navbaritem from "./components/navBar.mjs";
import modal from "./components/modal.mjs";

const app = Vue.createApp({
    data() {
        return {
            // ...
        }
    },
    methods: {
        // ...
    },
    components: {
        navbaritem,
        modal
    }
});

app.mount('#container');