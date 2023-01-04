export default {
    data () {
        return {
            styleModal: 'display: none;'
        }
    },
    methods: {
        /**
         * Methode pour ouvrir la modal
         * @returns {void}
         */
        openModal () {
            console.log('openModal')
            this.styleModal == 'display: block;' ? this.styleModal = 'display: none;' : this.styleModal = 'display: block;'
        }

    },
    template: `
        <!-- The Modal -->
        <div id="myModal" class="modal" :style="styleModal" @modalOpen="openModal">
        
            <!-- Modal content -->
            <div class="modal-content">
                <span class="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        
        </div>
    `,
}