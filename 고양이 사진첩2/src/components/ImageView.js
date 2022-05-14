const IMAGE =
    'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default function ImageView({ $app, initState }) {
    this.state = initState;
    this.$target = document.createElement('div');
    this.$target.className = 'Modal ImageViewer';

    $app.appendChild(this.$target);

    this.$target.style.display = 'none';

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render = () => {
        if (this.state !== undefined) {
            this.$target.innerHTML = `
            <div class="content">
                <img src="${IMAGE}${this.state}">
            </div>
            `;
            this.$target.style.display = 'block';
        } else {
            this.$target.style.display = 'none';
        }

        document.addEventListener('click', (e) => {
            if (e.target === document.querySelector('.Modal')) {
                this.$target.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 27) {
                this.$target.style.display = 'none';
            }
        });
    };
}
