export default function Nodes({ $app, initState, onClick, onBackClick }) {
    this.state = initState;
    this.onClick = onClick;
    this.onBackClick = onBackClick;
    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';

    $app.appendChild(this.$target);

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render = () => {
        const node = this.state.nodes
            .map((node) => {
                const path =
                    node.type === 'FILE'
                        ? './assets/file.png'
                        : './assets/directory.png';
                return `
            <div class="Node" id="${node.id}">
                <img src="${path}" />
                <div>${node.name}</div>
            </div>
            `;
            })
            .join('');
        this.$target.innerHTML = `
            ${
                this.state.isRoot
                    ? node
                    : `<div class="Node">
                <img src="./assets/prev.png" />
                </div>` + node
            }
        `;

        this.$target.querySelectorAll('.Node').forEach((node) => {
            const nodeId = node.id;

            node.addEventListener('click', (e) => {
                const selected = this.state.nodes.find(
                    (node) => node.id === nodeId
                );
                if (nodeId === '') {
                    this.onBackClick();
                } else {
                    this.onClick(selected);
                }
            });
        });
    };
}
