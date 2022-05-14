export default function Breadcrumb({ $app, initState }) {
    this.$target = document.createElement('nav');
    this.$target.className = 'Breadcrumb';

    $app.appendChild(this.$target);

    //depth = []
    this.state = initState;

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render = () => {
        this.$target.innerHTML = `<div>root</div>
        ${this.state.map((node) => `<div>${node.name}</div>`).join('')}
        `;
    };
}
