'use strict';
const readZone = document.getElementById('readZone');
const input = document.getElementById('fileinput');
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());
readZone.addEventListener('click', (event) => input.click());
input.addEventListener('change', readFile);
function readFile(event) {
    const file = event.target.files[0];
    const getData = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (event) => resolve(reader.result);
        reader.onerror = (event) => reject(reader.error);
    });
    getData
        .then(data => document.body.innerHTML = `<pre>${data}</pre>`)
        .catch(error => console.log(error));
}
//# sourceMappingURL=index.js.map