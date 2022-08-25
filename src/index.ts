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
  
  if (file.type.startsWith('text')) {
    readText(file);
  } else if (file.type.startsWith('image')) {
    readImage(file);
  } else {
    document.body.innerHTML = `<h2>Method for reading <span>${file.type}</span> not implement.</h2>`;
  }
}

function readText(file: File) {
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

function readImage(file: File) {
  
  const image: HTMLImageElement = document.createElement('img');
  image.src = URL.createObjectURL(file);
  
  document.body.append(image);
  
  URL.revokeObjectURL(image.src);
}
