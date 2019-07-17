import './css/common.css';
import './css/index.css';

function component() {
    var element = document.createElement('div');

    // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
    element.innerHTML = 'hello world';

    return element;
}
console.log($);
console.log('asf')
console.log(process.env.NODE_ENV, process.env.apiUrl);
document.body.appendChild(component());
