import './css/common.css';
import './css/index.css';

function component() {
    var element = document.createElement('div');

    element.innerHTML = 'hello world';

    return element;
}
console.log(process.env.NODE_ENV, process.env.apiUrl);
document.body.appendChild(component());
