import navbaritem from "./components/navBar.mjs";
import modal from "./components/modal.mjs";
import modalposter from "./components/modalPoster.mjs";

const app = Vue.createApp({
    data() {
        return {
            isModalAllowed: false,
            isModalPosterAllowed: false,
            savedElements: [],
            search: '',
            tableaufiltre: [],
            typeElement: [],
            allTypeElement: [],
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
            element.nbEp = 1;
            if(element.Poster === 'N/A'){
                // Image par défaut
                element.Poster = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
            }
            this.savedElements.push(element);
            fetch('/api/elements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(element)
            })
        },
        /**
         * Ajoute un épisode à un élément
         * @param {object} element
         * @returns {void}
         */
        addEpisode (element) {
            element.nbEp++;
            fetch('/api/element/episode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Title: element.Title,
                    operator: "add"
                })
            })
        },
        /**
         * Enlève un épisode à un élément
         * @param {object} element
         * @returns {void}
         */
        removeEpisode (element) {
            if (element.nbEp > 0) {
                element.nbEp--;
                fetch('/api/element/episode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Title: element.Title,
                        operator: "remove"
                    })
                })
            }
        },
        /**
         * Supprime un élément de la liste des éléments sauvegardés
         * @param {object} element
         * @returns {void}
         */
        deleteElement (element) {
            this.savedElements.splice(this.savedElements.indexOf(element), 1);
            fetch('/api/element', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Title: element.Title
                })
            })
            .then((response) => {
                if(response.status == 200) {
                    this.savedElements.splice(this.savedElements.indexOf(element), 1);
                }
            })
        },
        /**
         * Recherche un élément dans la liste des éléments sauvegardés
         * @param {string} val
         * @returns {void}
         */
        searchElement (val) {
            console.log(val);
            this.search = val;
        },
        /**
         * Permet d'ajouter un Poster à un élément
         * @param {object} element
         * @param {string} poster
         * @returns {void}
         */
        addPoster (poster, element) {
            if(poster === ''){
                return;
            }
            element.Poster = poster;
            fetch('/api/element/poster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Title: element.Title,
                    Poster: poster
                })
            })
        },
        /**
         * Ouvre la modal pour ajouter un poster
         * @returns {void}
         */
        openModalPoster () {
            this.isModalPosterAllowed = true;
        },
        /**
         * Ouvre la modal pour ajouter un poster
         * @returns {void}
         */
        closeModalPoster () {
            this.isModalPosterAllowed = false;
        },
        /**
         * Change l'état d'un élément
         * @param {object} element
         * @returns {void}
         */
        changeFinished (element) {
            if(element.Finished != undefined) {
                element.Finished = !element.Finished;
            } else {
                element.Finished = true;
            }
            fetch('/api/element/finished', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Title: element.Title,
                    Finished: element.Finished
                })
            })
        },
        /**
         * Ajout d'un filtre
         * @param {string} filtre
         * @returns {void}
         */
        addFilter (filtre) {
            if(this.tableaufiltre.includes(filtre)) {
                this.tableaufiltre.splice(this.tableaufiltre.indexOf(filtre), 1);
            } else {
                this.tableaufiltre.push(filtre);
            }
        },
        /**
         * Fonction de tri de tab en fonction d'un paramètre
         * @param {array} tab
         * @returns {array}
         */
        sortTab (array) {
            this.typeElement = [];
            if(this.tableaufiltre.length == 0 && this.search != '') {
                let tab = array.filter((element) => {
                    return element.Title.toLowerCase().includes(this.search.toLowerCase());
                });
                tab.forEach(element => {
                    if(!this.typeElement.includes(element.Type)) {
                        this.typeElement.push(element.Type);
                    }
                });
                return tab;
            }
            else if(this.tableaufiltre.length != 0 && this.search == '') {
                let tab = array
                for(let i = 0; i < this.tableaufiltre.length; i++) {
                    switch(this.tableaufiltre[i]) {
                        case 'Finit':
                            tab = tab.filter((element) => {
                                return element.Finished == true;
                            });
                        break;
                    }
                }
                tab.forEach(element => {
                    if(!this.typeElement.includes(element.Type)) {
                        this.typeElement.push(element.Type);
                    }
                });
                return tab;
            }
            else if (this.tableaufiltre.length != 0 && this.search != '') {
                let tab = this.array.filter((element) => {
                    return element.Title.toLowerCase().includes(this.search.toLowerCase());
                })

                // Apply filters on tab with a switch
                for(let i = 0; i < this.tableaufiltre.length; i++) {
                    switch(this.tableaufiltre[i]) {
                        case 'Finit':
                            tab = tab.filter((element) => {
                                return element.Finished == true;
                            });
                        break;
                    }
                }
                tab.forEach(element => {
                    if(!this.typeElement.includes(element.Type)) {
                        this.typeElement.push(element.Type);
                    }
                });
                return tab;  
            }else{
                array.forEach(element => {
                    if(!this.typeElement.includes(element.Type)) {
                        this.typeElement.push(element.Type);
                    }
                });
                return array;
            }
        },
        
    },
    computed : {
        /**
         * Renvoie les éléments séries sauvegardés
         * @returns {array}
         */
        savedElementsSerieDisplay () {
            if(this.tableaufiltre.includes('manga') && !this.tableaufiltre.includes('series')){
                return [];
            }
            return this.sortTab(this.savedElements.filter((element) => {
                return element.Type == 'series';
            }));
        },
        /**
         * Renvoie les éléments manga sauvegardés
         * @returns {array}
         */
        savedElementsMangaDisplay () {
            if(this.tableaufiltre.includes('series') && !this.tableaufiltre.includes('manga')){
                return [];
            }
            return this.sortTab(this.savedElements.filter((element) => {
                return element.Type == 'manga';
            }));
        },
    },
    mounted () {
        window.onclick = (event) => {
            if (event.target == document.getElementById('myModal')) {
                this.closeModal();
            }
        }
        fetch('/api/elements', {
            method: 'GET',
        })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            this.savedElements = data;
            this.savedElements.forEach(element => {
                if(!this.typeElement.includes(element.Type)) {
                    this.typeElement.push(element.Type);
                }
            });
            this.allTypeElement = this.typeElement;
            return this.savedElements;
        })
    },
    components: {
        navbaritem,
        modal,
        modalposter
    }
});

app.mount('#container');