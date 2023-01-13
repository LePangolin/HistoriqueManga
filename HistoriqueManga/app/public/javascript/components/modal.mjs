import modalManuel from "./modalManuel.mjs";

export default {
    props : ['styleModal'],
    data () {
        return {
            search: '',
            result : [],
            manuel : false,
            modalTitle : 'Recherche par API',
        }
    },
    methods: {
        /**
         * Ferme la modal
         * @returns {void}
         * @emits close-modal
         */
        closeModal () {
            this.$emit('modal-close');
        },
        /**
         * Recherche d'un élément
         * @returns {void}
         */
        searchElement () {
            fetch(`http://www.omdbapi.com/?apikey=7403b6e6&s=${this.search}&r=JSON`, {
                method: 'GET',
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.result = data.Search;
            })
        },
        /**
         * Enregistre un élément
         * @param {string} id
         * @returns {void}
         */
        saveElement (id){
            fetch(`http://www.omdbapi.com/?apikey=7403b6e6&i=${id}&r=JSON`, {
                method: 'GET',
            })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                this.$emit('save-element', data);
            })
        },
        /**
         * Envoie un signal pour le lien de l'élément manuellement
         * @param {object} item
         * @returns {void}
         * @emits save-element
         */
        linkSignal (item) {
            this.$emit('save-element', item);
        },
        /** 
         * Ouvre la modal pour ajouter un élément manuellement
         * @returns {void}
         */
        openModalManuel () {
            this.manuel = !this.manuel;
            if(this.manuel){
                this.modalTitle = "Ajouter un élément manuellement";
            }else{
                this.modalTitle = "Recherche par API";
            }
        }
    },
    computed: {
        /**
         * Renvoie les résultats de la recherche
         * @returns {array}
         */
        resultDisplay () {
            if(this.result === undefined) return [];
            for(let i = 0; i < this.result.length; i++){
                if(this.result[i].Poster === 'N/A'){
                    // Image par défaut
                    this.result[i].Poster = 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg';
                }
            }
            return this.result;
        }
    },
    components : {
        modalmanuel : modalManuel
    },
    template: `
        <!-- The Modal -->
        <div class="modal" style="display: block;">
        
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <div class="modal-content-container">
                    <div class="modal-content-container-item">
                        <h1> <i class="fa fa-arrow-left" @click="openModalManuel"></i>&nbsp;{{modalTitle}}&nbsp;<i class="fa fa-arrow-right" @click="openModalManuel"></i></h1>
                    </div>
                    <modalmanuel v-if="manuel" @save-element-manuel="linkSignal" ></modalmanuel>
                    <div v-else>
                        <div class="modal-content-container-body">
                            <div class="modal-content-container-body-item">
                                <input type="text" placeholder="Search" class="search" v-model="search">
                            </div>
                            <div class="modal-content-container-body-item">
                                <i class="fa fa-search" @click="searchElement"></i>
                            </div>
                        </div>
                        <div class="modal-content-container-result">
                            <ul class="cards">
                                <div v-if="resultDisplay.length === 0" class="modal-content-container-result-item">
                                    <h1>Aucun résultat</h1>
                                </div>
                                <li v-else v-for="item in resultDisplay" :key="item.imdbID">
                                    <div class="card">
                                        <img :src="item.Poster" class="card__image" alt="" />
                                        <div class="card__overlay">
                                            <div class="card__header">
                                                <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                                                <div class="card__header-text">
                                                    <h3 class="card__title">{{item.Title}}</h3>            
                                                    <span class="card__status">{{item.Year}}</span>
                                                </div>
                                            </div>
                                            <p class="card__description"><button @click="saveElement(item.imdbID)">Enregistrer</button></p>
                                        </div>
                                    </div>      
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    `,
}