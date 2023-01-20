export default {
    props : ['rate', 'title'],
    emits : ['update-rate'],
    data () {
        return {
            rates: [
                'none',
                'none',
                'none',
                'none',
                'none'
            ]
        }
    },
    methods: {
        /**
         * Augmente la notation en étoile
         * @param {number} index
         * @returns {void}
         * @emits update-rate
         */
        rateUp (index) {
            // On remet tout à zéro
            for (let i = 0; i < this.rates.length; i++) {
                this.rates[i] = 'none';
            }
            // On met les étoiles à jour
            for (let i = 0; i <= index; i++) {
                this.rates[i] = 'star';
            }
            this.$emit('update-rate', index + 1, this.title);
        },
    },
    mounted () {
        for (let i = 0; i < this.rate; i++) {
            this.rates[i] = 'star';
        }
    },
    template: `
    <span :class="rates[0]" @click="rateUp(0)" class="no-select clickable">★</span><span :class="rates[1]" @click="rateUp(1)" class="no-select clickable">★</span><span :class="rates[2]" @click="rateUp(2)" class="no-select clickable">★</span><span :class="rates[3]" @click="rateUp(3)" class="no-select clickable">★</span><span :class="rates[4]" @click="rateUp(4)" class="no-select clickable">★</span>
    `,
}