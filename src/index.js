import './css/common.css';
import './css/index.css';

function component() {

    let name = [];
    for (var i = 0; i < 10; i++) {
        const title = `ajds${i}`;
        name.push(title)
    }

    var element = document.createElement('div');

    element.innerHTML = 'hello world';

    return element;
}
console.log(process.env.NODE_ENV, process.env.apiUrl);
document.body.appendChild(component());
