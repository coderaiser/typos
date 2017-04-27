'use strict';

const input = document.querySelector('[data-name="input"]');
const button = document.querySelector('[data-name="add-text"]');
const textEl = document.querySelector('[data-name="text"]');
const errorEl = document.querySelector('[data-name="error"]');
const errorsCountEl = document.querySelector('[data-name="errors-count"]');

input.addEventListener('keydown', (event) => {
    const {code} = event;
    
    if (code !== 'Enter')
        return;
    
    event.stopPropagation();
    button.disabled = true;
    prepare();
});

button.addEventListener('click', prepare);

function prepare() {
    const {value} = input;
    
    start(value);
    textEl.textContent = value;
    input.blur();
}

function start() {
    const typo = typos('hello world');
    const keydown = ({key}) => {
        typo.add(key);
    };
    
    let errorsCount = 0;
    
    typo
        .on('error', (e) => {
            ++errorsCount;
            errorEl.textContent = e.message;
            errorsCountEl.textContent = errorsCount;
        })
        .on('add', () => {
            textEl.textContent = textEl.textContent.slice(1);
            errorEl.textContent = '';
        })
        .on('end', (data) => {
            console.log(data);
            button.disabled = false;
            window.removeEventListener('keydown', keydown);
        });
    
    window.addEventListener('keydown', keydown);
}

