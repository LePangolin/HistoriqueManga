export default {
    data () {
        return {
            Title : '',
            Year : '',
            Poster : '',
        }
    },
    methods: {
        /**
         * Envoie un signal pour le lien de l'élément
         * @returns {void}
         * @emits link-element
         */
        linkSignal () {
            if(this.Title === '' || this.Year === '' || this.Poster === '') return;
            this.$emit('save-element-manuel', {
                Title: this.Title,
                Year: this.Year,
                Poster: this.Poster,
            });
        }
    },
    computed: {
        // ...
    },
    template: `
    <div class="modal-content-container-body">
        <div class="modal-content-container-body-item">
            <input type="text" placeholder="Title" class="Title" v-model="Title">
        </div>
        <div class="modal-content-container-body-item">
            <input type="text" placeholder="Year" class="Year" v-model="Year">
        </div>
        <div class="modal-content-container-body-item">
            <input type="text" placeholder="Poster" class="Poster" v-model="Poster">
        </div>
        <button @click="linkSignal">Save</button>
    </div>
    `
}
