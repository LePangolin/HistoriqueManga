export default {
    props : ['Title', 'Year', 'Poster', 'nbEp'],
    data () {
        return {
            // ...
        }
    },
    methods: {
        // ...
    },
    template: `
    <li v-for="item in savedElementsDisplay" class="card">
        <div class="card">
            <img :src="Poster" class="card__image" alt="" />
            <div class="card__overlay">
                <div class="card__header">
                    <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                    <div class="card__header-text">
                        <h3 class="card__title">{{Title}}</h3>            
                        <span class="card__status">{{Year}}</span>
                    </div>
                </div>
                <p class="card__description">
                    Épisode actuel : {{nbEp}} <br>
                </p>
                <div class="card__buttons">
                    <button class="card__button__group bg-green" @click="addEpisode(item)">Ajouter un épisode</button>
                    <button class="card__button__group bg-red" @click="removeEpisode(item)">Retirer un épisode</button>
                </div>
                <div v-if="item.Poster == 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'">
                    <button class="card__button__group bg-blue" @click="openModalPoster">Ajouter un poster</button>
                    <modalposter v-if="isModalPosterAllowed" @modal-poster-close="closeModalPoster" @link-element="addPoster" :item="item"></modalposter>
                </div>
                <div class="card__button">
                    <button class="card__button" @click="deleteElement(item)">Supprimer</button>
                </div>
            </div>
        </div>
    </li>
    `
}