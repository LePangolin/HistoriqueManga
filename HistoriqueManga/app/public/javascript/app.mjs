import navbaritem from "./components/navBar.mjs";
import modal from "./components/modal.mjs";

const app = Vue.createApp({
    data() {
        return {
            isModalAllowed: false,           
        }
    },
    methods: {
        /**
         * Ouvre la modal
         * @returns {void}
         */
        openModal () {
            this.isModalAllowed = true;
        },

        /**
         * Ferme la modal
         * @returns {void}
         */
        closeModal () {
            this.isModalAllowed = false;
        }
    },
    mounted () {
        window.onclick = (event) => {
            if (event.target == document.getElementById('myModal')) {
                this.closeModal();
            }
        }
    },
    components: {
        navbaritem,
        modal
    }
});

app.mount('#container');