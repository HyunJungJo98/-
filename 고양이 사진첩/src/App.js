import { request } from './api/api.js';
import Breadcrumb from './components/Breadcrumb.js';
import Nodes from './components/Nodes.js';
import ImageView from './components/ImageView.js';
import Loading from './components/Loading.js';

function App($app) {
    this.$app = $app;

    this.state = {
        isRoot: false,
        depth: [],
        nodes: [],
        loading: false,
    };

    this.$imageView = new ImageView({
        $app,
        initialState: this.state.selectedFile,
    });

    this.$breadcrumb = new Breadcrumb({ $app, initialState: this.state.depth });

    this.$nodes = new Nodes({
        $app,
        initialState: this.state,
        onClick: async (node) => {
            try {
                this.setState({
                    ...this.state,
                    loading: true,
                });
                if (node.type === 'FILE') {
                    //FILE인 경우
                    this.setState({
                        ...this.state,
                        selectedFile: node.filePath,
                    });
                } else if (node.type === 'DIRECTORY') {
                    const result = await request(node.id);
                    console.log(result);
                    this.setState({
                        isRoot: false,
                        depth: [...this.state.depth, node],
                        nodes: result,
                    });
                }
            } catch (e) {
                throw new Error(e);
            } finally {
                this.setState({
                    ...this.state,
                    loading: false,
                });
            }
        },
        onBackClick: async () => {
            try {
                this.setState({
                    ...this.state,
                    loading: true,
                });
                const nextState = { ...this.state };
                nextState.depth.pop();

                if (nextState.depth.length === 0) {
                    const result = await request();
                    this.setState({
                        ...this.state,
                        isRoot: true,
                        nodes: result,
                    });
                } else {
                    const result = await request(
                        nextState.depth[nextState.depth.length - 1].id
                    );
                    this.setState({
                        ...this.state,
                        isRoot: false,
                        nodes: result,
                    });
                }
            } catch (e) {
                throw new Error(e);
            } finally {
                this.setState({
                    ...this.state,
                    loading: false,
                });
            }
        },
    });

    this.$loading = new Loading({ $app, initialState: this.state.loading });

    this.setState = (newState) => {
        this.state = newState;
        this.$nodes.setState(newState);
        this.$breadcrumb.setState(newState.depth);
        this.$imageView.setState(newState.selectedFile);
        this.$loading.setState(newState.loading);
        console.log(newState);
    };

    this.init = async () => {
        try {
            this.setState({
                ...this.state,
                isRoot: true,
                loading: true,
            });
            const result = await request();
            this.setState({
                ...this.state,
                isRoot: true,
                nodes: result,
            });
        } catch (e) {
            console.warn(e);
        } finally {
            this.setState({
                ...this.state,
                loading: false,
            });
            console.log(this.state);
        }
    };

    this.init();
}

export default App;
