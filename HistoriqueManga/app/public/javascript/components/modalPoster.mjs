export default {
    props: ['item'],
    data () {
        return {
            link: '',
        }
    },
    methods: {
        /**
         * Envoie un signal pour le lien de l'élément
         * @returns {void}
         * @emits link-element
         * @emits modal-poster-close
         */
        linkSignal () {
            this.$emit('link-element', this.link, this.item);
            this.$emit('modal-poster-close');
        }
    },
    template: `
    <div class="modal" style="display: block;">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close" @click="$emit('modal-poster-close')">&times;</span>
                <h2>Poster</h2>
            </div>
            <div class="modal-body">
                <input type="text" placeholder="Link" v-model="link">
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" @click="linkSignal">Save</button>
            </div>
        </div>
    </div>
    `
}