class ResultArea {
    $target;
    data = [];
    loading = false;
    onClick = null;
    //render에서 사용하기 위해 전역으로 선언
    //$result;
    constructor({ $target, data, onClick }) {
        this.$target = $target;

        const $result = document.createElement('div');
        //전역에서 선언 안 하고 바로 해도 됨
        this.$result = $result;
        $target.appendChild($result);

        this.data = data;
        this.onClick = onClick;

        this.render();
    }

    setState(data) {
        this.data = data.data;
        this.loading = data.loading;
        this.render();
    }

    render() {
        console.log(this.data);
        if (this.loading) {
            // => 다음에 {} 붙이면 안 됨
            // .join('')해줘야 , 가 안 붙음
            // this.$result.innerHTML = this.data
            //     .map(
            //         (item) =>
            //             `<div class = "item" title="${item.title}">${item.title}</div>`
            //     )
            //     .join('');
            if (this.data === null) {
                this.$result.innerHTML = `<div>결과가 없습니다</div>`;
            } else {
                this.$result.innerHTML = `<div class="item">${this.data.title}</div>`;
                this.$result
                    .querySelector('.item')
                    .addEventListener('click', (e) => {
                        this.onClick(this.data);
                    });
            }
        } else if (!this.loading && this.data === null) {
            this.$result.innerHTML = `<div>Loading...</div>`;
        } else if (!this.loading && this.data.length === 0) {
            this.$result.innerHTML = `<h3>아직 아무것도 없습니다</h3>`;
        }
    }
}
