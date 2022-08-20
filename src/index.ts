'use strict';

function readFile(fileList) {
  const file: File = fileList.files[0];
  
  const reader = new FileReader();
  
  reader.readAsText(file);
  
  reader.onload = function () {
    console.log(reader.result);
  }
  
  reader.onerror = function () {
    console.log(reader.error);
  }
}
