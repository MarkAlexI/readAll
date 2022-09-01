'use strict';

const readZone = document.getElementById('readZone') as HTMLElement;

const input= document.getElementById('fileinput') as HTMLInputElement | null;


document.addEventListener('dragover', (event: Event) => event.preventDefault());
document.addEventListener('drop', (event: Event) => event.preventDefault());

readZone.addEventListener('click', (event: Event) => input.click());
readZone.addEventListener('drag', (event: DragEvent) => {
  event.preventDefault();
  const file: File = event.dataTransfer.files[0];
  readFile(file);
});

input.addEventListener('change', (event: Event) => {
  const file: File = (<HTMLInputElement>event.target).files[0];
  readFile(file)
});

function readFile(file: File): void {
  
  readZone.remove();
  input.remove();
  
  if (file.type.endsWith('pdf')) {
    readPDF(file);
    return;
  }
  
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

function readText(file: File): void {
  const getData = new Promise < string > ((resolve, reject) => {
        const reader: FileReader = new FileReader();

        reader.readAsText(file);

        reader.onload = (event: Event) => resolve(<string>reader.result);
  
    reader.onerror = (event: Event) => reject(reader.error);
  });
  
  getData
    .then(data => document.body.innerHTML = `<pre>${data}</pre>`)
    .catch(error => console.log(error));
}

function readImage(file: File): void {
  
  const image: HTMLImageElement = document.createElement('img');
  image.src = URL.createObjectURL(file);
  
  document.body.append(image);
  
  URL.revokeObjectURL(image.src);
}

async function readAudio(file: File): Promise<void> {

  const audio: HTMLAudioElement = document.createElement('audio');
  audio.src = URL.createObjectURL(file);
  audio.setAttribute('controls', '');

  document.body.append(audio);

  try {
    await audio.play();
    displayInfo('Playing audio ' + file.name);
  } catch (error) {
    displayInfo('Failed to play, error: ' + error);
  }
  
  URL.revokeObjectURL(audio.src);
}

async function readVideo(file: File): Promise<void> {
  const video: HTMLVideoElement = document.createElement('video');
  video.src = URL.createObjectURL(file);
  video.setAttribute('controls', '');
  video.setAttribute('loop', 'true');
  
  document.body.append(video);
  URL.revokeObjectURL(video.src);
  
  try {
    await video.play();
    displayInfo('Playing video ' + file.name);
  } catch(error) {
    displayInfo('Failed to play, error: ' + error);
  }
}

function readPDF(file: File): void {
  const iframe: HTMLIFrameElement = document.createElement('iframe');
  
  iframe.src = URL.createObjectURL(file);
  
  document.body.append(iframe);
  URL.revokeObjectURL(iframe.src);
}

function displayInfo(text: string): void {
  const hr: HTMLHRElement = document.createElement('hr');
  const h3: HTMLElement = document.createElement('p');
  h3.innerText = text;
  
  document.body.append(hr);
  document.body.append(h3);
}
