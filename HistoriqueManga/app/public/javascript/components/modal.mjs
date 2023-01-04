import cards from "./cards.mjs";

export default {
    props : ['styleModal'],
    data () {
        return {
            search: '',
            result : []
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
                console.log(data);
            })
        }
    },
    computed: {
        /**
         * Renvoie les résultats de la recherche
         * @returns {array}
         */
        resultDisplay () {
            console.log(this.result);
            return this.result;
        }
    },
    mounted () {
       console.log(cards);
    },
    components: {
        cards
    },
    template: `
        <!-- The Modal -->
        <div id="myModal" class="modal" style="display: block;">
        
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <div class="modal-content-container">
                    <div class="modal-content-container-item">
                        <h1>Modal Header</h1>
                    </div>
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
                            <li v-for="item in resultDisplay" :key="item.imdbID">
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
    `,
}