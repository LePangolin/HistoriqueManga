export default {
    data () {
        return {
            search: ''
        }
    },
    methods: {
        /**
         * Emet un signal pour ouvrir la modal
         * @emits modalSignal
         * @returns {void} 
         */
        modalSignal () {
            this.$emit('modalOpen')
        }
    },
    template: `
        <div class="nav">
            <div class="navBarLogo">
                <img src="" alt="logo">
            </div>
            <div class="navbarElem">
                <div class="navbarElemItem">
                    <input type="text" placeholder="Search" class="search" v-model="search">
                </div>
                <div class="navbarElemItem">
                    <i class="fa fa-search"></i>
                </div>
                <div class="navbarElemItem">
                    <i class="fa fa-plus" @click="modalSignal"></i>
                </div>
            </div>
        </div>
    `,
}