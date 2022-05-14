class Detail {
    $target;
    data = null;
    visible = false;
    constructor({ $target, data }) {
        this.$target = $target;
        this.data = data;

        this.$detail = document.createElement('div');
        this.$detail.className = 'detail';

        this.$target.appendChild(this.$detail);

        this.render();
    }

    setState(data) {
        this.data = data.detail;
        this.visible = data.visible;
        this.render();
    }

    render() {
        if (this.visible) {
            this.$detail.classList.remove('fade');
            console.log(this.$detail.classList);
            const { completed, id, title, userId } = this.data;
            console.log(title);
            this.$detail.innerHTML = `
            <div class = "wrapper">
            <div class = "close">x</div>
            <div>${title}</div>
            <div>userid: ${userId}, id: ${id}</div>
            </div>`;
            this.$detail.style.display = 'block';
            document.addEventListener('click', (e) => {
                if (
                    e.target === document.querySelector('.detail') ||
                    e.target === document.querySelector('.close')
                ) {
                    this.$detail.classList.add('fade');
                    this.$detail.style.display = 'none';
                    console.log(this.$detail.classList);
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.keyCode === 27) {
                    this.$detail.classList.add('fade');
                    this.$detail.style.display = 'none';
                    console.log(this.$detail.classList);
                }
            });
        } else {
            this.$detail.style.display = 'none';
        }
    }
}
