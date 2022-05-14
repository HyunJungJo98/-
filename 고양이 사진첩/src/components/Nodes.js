export default function Nodes({ $app, initialState, onClick, onBackClick }) {
    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';

    this.state = initialState;
    this.onClick = onClick;
    this.onBackClick = onBackClick;

    $app.appendChild(this.$target);

    this.setState = (newState) => {
        this.state = newState;
        this.render();
        console.log("Nodes's state:", newState);
    };

    this.render = () => {
        if (this.state.nodes) {
            const node = this.state.nodes
                .map((node) => {
                    const filePath =
                        node.type === 'FILE'
                            ? './assets/file.png'
                            : './assets/directory.png';
                    return `
                <div class="Node" id="${node.id}">
                    <img src="${filePath}" />
                    <div>${node.name}</div>
                </div>
                `;
                })
                .join('');

            this.$target.innerHTML = !this.state.isRoot
                ? `
                <div class="Node">
                    <img src="./assets/prev.png" />
                </div>
                ${node}
                `
                : node;

            this.$target.querySelectorAll('.Node').forEach(($node) => {
                $node.addEventListener('click', (e) => {
                    const nodeId = $node.id;
                    if (nodeId === '') {
                        this.onBackClick();
                    } else {
                        const selectedNode = this.state.nodes.find(
                            (node) => node.id === nodeId
                        );
                        this.onClick(selectedNode);
                    }
                });
            });
        }
    };
}
