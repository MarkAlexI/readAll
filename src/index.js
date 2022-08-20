'use strict';
function readFile(fileList) {
    const file = fileList.files[0];
    const getData = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
    });
    getData
        .then(data => console.log(data))
        .catch(error => console.log(error));
}
//# sourceMappingURL=index.js.map