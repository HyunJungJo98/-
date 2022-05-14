const IMAGE_URL =
    'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

export default function ImagaView({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'Modal ImageViewer';
    $app.appendChild(this.$target);

    this.setState = (newState) => {
        this.state = newState;
        console.log(this.state);
        this.render();
    };

    this.render = () => {
        if (this.state !== undefined) {
            this.$target.innerHTML = `
            <div class="content">
              <img src="${IMAGE_URL}${this.state}">
            </div>
            `;
            this.$target.style.display = 'block';
            this.$target.addEventListener('click', (e) => {
                if (e.target === document.querySelector('.Modal')) {
                    this.$target.style.display = 'none';
                }
            });
            document.addEventListener('keydown', (e) => {
                if (e.keyCode === 27) {
                    this.$target.style.display = 'none';
                }
            });
        } else {
            this.$target.style.display = 'none';
        }
    };
}
