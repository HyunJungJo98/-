console.log('hello');

class App {
    $target = null;
    data = [];
    hello = 'hello';

    constructor($target) {
        this.$target = $target;

        this.inputArea = new InputArea({
            $target,
            onSearch: (item) => {
                this.setState({
                    loading: false,
                    data: null,
                });
                api.fetchUsers(item).then((data) =>
                    this.setState({
                        loading: true,
                        data: data,
                    })
                );
            },
        });

        this.resultArea = new ResultArea({
            $target,
            data: this.data,
            onClick: (detail) => {
                this.detail.setState({
                    visible: true,
                    detail: detail,
                });
            },
        });

        this.detail = new Detail({
            $target,
            data: {
                visible: false,
                detail: null,
            },
        });
    }

    setState(data) {
        this.data = data;
        this.resultArea.setState(data);
        console.log(data);
    }
}
