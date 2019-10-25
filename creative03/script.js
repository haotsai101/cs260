let app = new Vue({
    el: '#app',
    data: {
        value: '',
        current: {

        },
        mList: [],
        msg: '',
        errors: ['put in your movie name'],
        valid: false,
    },

    created() {
        this.getMovie();
    },

    watch: {
        value(v, oldv) {
            if (v === '') {
                this.msg = 'input should not be empty';
            }
        },
    },
    methods: {
        async getMovie() {
            try {
                const response = await axios.get('http://www.omdbapi.com/?t=' + this.value + '&apikey=404df8f3');
                this.current = response.data;
            }
            catch (error) {
                console.log(error);
            }
        },
        addToList() {
            console.log('valid: ' + this.valid);
            if (!(this.contains()) && this.valid) {
                console.log(this.current);
                this.mList.push({ movie: this.current });
                console.log(this.mList);
            }
            else {
                console.log('existed');
            }
        },
        contains() {
            for (let i = 0; i < this.mList.length; i++) {
                if (this.mList[i].movie.Title === this.current.Title) {
                    return true;
                }
            }
            return false;
        },
        checkForm: function(e) {
            if (this.value) {
                this.valid = true;
                this.errors = [];
                return true;
            }

            this.errors = [];

            if (!this.value) {
                this.valid = false;
                this.errors.push('Movie name required.');
            }

            e.preventDefault();
        },
        deleteItem(item) {
            var index = this.mList.indexOf(item);
            if (index > -1)
                this.mList.splice(index, 1);
        },
        dragItem(item) {
            this.drag = item;
        },
        dropItem(item) {
            const indexItem = this.mList.indexOf(this.drag);
            const indexTarget = this.mList.indexOf(item);
            this.mList.splice(indexItem, 1);
            this.mList.splice(indexTarget, 0, this.drag);
        },


    }

});
