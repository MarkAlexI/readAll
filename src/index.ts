'use strict';

const readZone = document.getElementById('readZone') as HTMLElement;

const input= document.getElementById('fileinput') as HTMLInputElement | null;


document.addEventListener('dragover', (event: Event) => event.preventDefault());
document.addEventListener('drop', (event: Event) => event.preventDefault());
readZone.addEventListener('click', (event: Event) => input.click());
input.addEventListener('change', readFile);

function readFile(event: Event): void {
  const file: File = (<HTMLInputElement>event.target).files[0];
  
  const getData = new Promise<string>((resolve, reject) => {
    const reader: FileReader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = (event: Event) => resolve(<string>reader.result);
  
    reader.onerror = (event: Event) => reject(reader.error);
  });
  
  getData
    .then(data => document.body.innerHTML = `<pre>${data}</pre>`)
    .catch(error => console.log(error));
}
