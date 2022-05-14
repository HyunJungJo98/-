import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';
import ImageView from './components/ImageView.js';
import { api } from './api/api.js';
import Loading from './components/Loading.js';

export default function App($app) {
    this.$app = $app;
    this.state = {
        isRoot: true,
        depth: [],
        nodes: [],
        filePath: undefined,
        loading: true,
    };

    this.$loading = new Loading({ $app, initState: true });

    this.$imageView = new ImageView({ $app, initState: null });

    this.$breadcrumb = new Breadcrumb({ $app, initState: this.state.depth });

    this.$nodes = new Nodes({
        $app,
        initState: this.state,
        onClick: (node) => {
            this.setState({
                ...this.state,
                loading: true,
            });
            if (node.type === 'DIRECTORY') {
                api.dir(node.id).then((data) => {
                    this.setState({
                        isRoot: false,
                        depth: [...this.state.depth, node],
                        nodes: data,
                        loading: false,
                    });
                });
            } else if (node.type === 'FILE') {
                //이미지
                this.setState({
                    ...this.state,
                    filePath: node.filePath,
                    loading: false,
                });
            }
        },
        onBackClick: () => {
            this.setState({
                ...this.state,
                loading: true,
            });
            const s = { ...this.state };
            s.depth.pop();

            if (s.depth.length === 0) {
                api.rootDir().then((data) => {
                    this.setState({
                        ...this.state,
                        isRoot: true,
                        nodes: data,
                        filePath: undefined,
                        loading: false,
                    });
                });
            } else {
                api.dir(s.depth[s.depth.length - 1].id).then((data) => {
                    this.setState({
                        ...this.state,
                        isRoot: false,
                        nodes: data,
                    });
                });
            }
        },
    });

    this.setState = (newState) => {
        this.state = newState;
        this.$breadcrumb.setState(newState.depth);
        this.$nodes.setState(newState);
        this.$imageView.setState(newState.filePath);
        this.$loading.setState(newState.loading);
    };

    this.init = () => {
        this.setState({
            ...this.state,
            loading: true,
        });
        api.rootDir().then((data) => {
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: data,
                filePath: undefined,
                loading: false,
            });
        });
    };

    this.init();
}
