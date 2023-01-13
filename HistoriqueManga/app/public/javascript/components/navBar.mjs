export default {
    data () {
        return {
            search: '',
            tabFilter : [],
        }
    },
    methods: {
        /**
         * Emet un signal pour ouvrir la modal
         * @emits modal-open
         * @returns {void} 
         */
        modalSignal () {
            this.$emit('modal-open')
        },
        /**
         * Ajoute ou supprime un filtre et émet un signal
         * @param {string} filter
         * @returns {void}
         * @emits filter-element
         */
        filterSignal (filter) {
            this.$emit('filter-element', filter)
            if (this.tabFilter.includes(filter)) {
                this.tabFilter.splice(this.tabFilter.indexOf(filter), 1)
            } else {
                this.tabFilter.push(filter)
            }
        }
    },
    watch: {
        search (val) {
            this.$emit('search-element', val)
        }
    },
    template: `
        <div class="nav">
            <div class="navBarLogo">
                <img src="" alt="logo">
            </div>
            <div class="navbarElem">
                <div class="navbarElemItem groupe-filtre">
                    <i class="fa fa-check-square groupe-filtre-item" :style="tabFilter.includes('Finit') ? 'color: orange' : 'color: white' " @click="filterSignal('Finit')"></i>
                    <i class="fa fa-book groupe-filtre-item" :style="tabFilter.includes('manga') ? 'color: orange' : 'color: white' " @click="filterSignal('manga')"></i>
                    <i class="fa fa-film groupe-filtre-item" :style="tabFilter.includes('series') ? 'color: orange' : 'color: white' " @click="filterSignal('series')"></i>
                </div>
                <div class="navbarElemItem">
                    <input type="text" placeholder="Search" class="search" v-model="search">
                </div>
                <div class="navbarElemItem">
                    <i class="fa fa-search"></i>
                </div>
                <div class="navbarElemItem">
                    <i class="fa fa-plus" @click="modalSignal"></i>
                </div>
                <div class="navbarElemItem">
                    <i class="fa fa-bars"></i>
                </div>
            </div>
        </div>
    `,
}