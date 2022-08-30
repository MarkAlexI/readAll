'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const readZone = document.getElementById('readZone');
const input = document.getElementById('fileinput');
document.addEventListener('dragover', (event) => event.preventDefault());
document.addEventListener('drop', (event) => event.preventDefault());
readZone.addEventListener('click', (event) => input.click());
readZone.addEventListener('drag', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    readFile(file);
});
input.addEventListener('change', (event) => {
    const file = event.target.files[0];
    readFile(file);
});
function readFile(file) {
    readZone.remove();
    input.remove();
    switch (file.type.slice(0, file.type.indexOf('/'))) {
        case 'text':
            readText(file);
            break;
        case 'image':
            readImage(file);
            break;
        case 'audio':
            readAudio(file);
            break;
        case 'video':
            readVideo(file);
            break;
        default:
            document.body.innerHTML = `<h2>Method for reading <span>${file.type}</span> not implement.</h2>`;
            setTimeout(() => {
                window.location.reload();
            }, 3000);
            break;
    }
}
function readText(file) {
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
function readImage(file) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    document.body.append(image);
    URL.revokeObjectURL(image.src);
}
function readAudio(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const audio = document.createElement('audio');
        audio.src = URL.createObjectURL(file);
        audio.setAttribute('controls', '');
        document.body.append(audio);
        try {
            yield audio.play();
            console.log('Playing audio' + audio);
        }
        catch (error) {
            console.log('Failed to play, error: ' + error);
        }
        URL.revokeObjectURL(audio.src);
    });
}
function readVideo(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.setAttribute('controls', '');
        video.setAttribute('loop', 'true');
        document.body.append(video);
        URL.revokeObjectURL(video.src);
        try {
            yield video.play();
            console.log('Playing video' + video);
        }
        catch (error) {
            console.log('Failed to play, error: ' + error);
        }
    });
}
//# sourceMappingURL=index.js.map