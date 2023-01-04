export default {
    props : ['title', 'date', 'img'],
    data () {
        return {
            // ...
        }
    },
    methods: {
        // ...
    },
    mouted () {
        console.log(this.title);
    },
    template: `
        <li>
            <a href="" class="card">
                <img src="{{img}}" class="card__image" alt="" />
                <div class="card__overlay">
                    <div class="card__header">
                        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
                        <img class="card__thumb" src="https://i.imgur.com/7D7I6dI.png" alt="" />
                        <div class="card__header-text">
                            <h3 class="card__title">{{title}}</h3>            
                            <span class="card__status">{{date}}</span>
                        </div>
                    </div>
                </div>
            </a>      
        </li>`,
}
