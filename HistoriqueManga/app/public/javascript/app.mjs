import navbaritem from "./components/navBar.mjs";
import modal from "./components/modal.mjs";

const app = Vue.createApp({
    data() {
        return {
            isModalAllowed: false,
            savedElements: []       
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
        },

        /**
         * Ajoute un élément à la liste des éléments sauvegardés
         * @param {object} element
         * @returns {void}
         */
        addElement (element) {
            this.savedElements.push(element);
            console.log(this.savedElements);
        }
    },
    computed: {
        /**
         * Renvoie les éléments sauvegardés
         * @returns {array}
         */
        savedElementsDisplay () {
            return this.savedElements;
        }
    },
    computed : {
        /**
         * Renvoie les éléments sauvegardés
         * @returns {array}
         */
        savedElementsDisplay () {
            return this.savedElements;
        }
    },
    mounted () {
        window.onclick = (event) => {
            if (event.target == document.getElementById('myModal')) {
                this.closeModal();
            }
        }
        // TODO: Récupérer les éléments sauvegardés
        // fetch('/api/elements', {
        //     method: 'GET',
        // })
        // .then((response) => {
        //     return response.json()
        // })
        // .then((data) => {
        //     this.savedElements = data;
        // })
    },
    components: {
        navbaritem,
        modal
    }
});

app.mount('#container');