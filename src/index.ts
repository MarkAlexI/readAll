'use strict';

function readFile(fileList) {
  const file: File = fileList.files[0];
  
  const getData = new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
  
    reader.readAsText(file);
  
    reader.onload = () => resolve(<string>reader.result);
  
    reader.onerror = () => reject(reader.error);
  });
  
  getData
    .then(data => console.log(data))
    .catch(error => console.log(error));
}
