export default function Loading({ $app, initState }) {
    this.state = initState;
    this.$target = document.createElement('div');
    this.$target.className = 'Modal Loading';

    $app.appendChild(this.$target);

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render = () => {
        if (this.state) {
            this.$target.innerHTML = `
            <div class="content">
                <img src="./assets/nyan-cat.gif">
            </div>
          `;
            this.$target.style.display = 'block';
        } else {
            this.$target.style.display = 'none';
        }
    };
}
