export default function Breadcrumb({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement('nav');
    this.$target.className = 'Breadcrumb';

    $app.appendChild(this.$target);

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render = () => {
        console.log(this.state);
        this.$target.innerHTML = `
            <div>root</div>
            ${this.state
                .map((node, index) => `<div>${node.name}</div>`)
                .join('')}
        `;
    };
}
