console.log('inputarea');

class InputArea {
    keyword = '';
    constructor({ $target, onSearch }) {
        const $input = document.createElement('input');
        $input.placeholder = '입력해주세요';
        this.$input = $input;
        this.$input.autofocus = 'true';

        this.$mode = document.createElement('input');
        this.$mode.type = 'checkbox';
        this.$mode.className = 'dark';

        const comButton = document.createElement('button');
        comButton.innerHTML = '완료';

        $target.appendChild($input);
        $target.appendChild(comButton);
        $target.appendChild(this.$mode);

        $input.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                onSearch(e.target.value);
                e.target.value = '';
            }
        });

        comButton.addEventListener('click', (e) => {
            if ($input.value !== '') {
                onSearch($input.value);
                $input.value = '';
            }
        });

        this.$mode.addEventListener('click', (e) => {
            // const theme = window.matchMedia(
            //     '(prefers-color-scheme:Dark)'
            // ).matches;

            //다크모드일 때 선택할 수 있게 해줌
            //theme&&$!this.mode.checked
            if (!this.$mode.checked) {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
                console.log(document.body.classList);
            }
            //theme&&this.$mode.checked
            else if (this.$mode.checked) {
                document.body.classList.remove('light');
                document.body.classList.add('dark');
                console.log(document.body.classList);
            }
        });
    }
}
