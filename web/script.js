let fileInput, uploadBtn, progressBar, statusEl;

document.addEventListener("DOMContentLoaded", () => {
  fileInput = document.getElementById("file");
  uploadBtn = document.getElementById("upload-btn");
  progressBar = document.getElementById("progress-bar");
  statusEl = document.getElementById("status");

  uploadBtn.addEventListener("click", handleUpload);
});

async function handleUpload(e) {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) {
    alert("you must select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  progressBar.style.opacity = 100;

  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
      const percentCompleted = Math.round((e.loaded / e.total) * 100);

      progressBar.value = percentCompleted;
      statusEl.textContent = `${percentCompleted}% uploaded`;
    }
  });

  const completeHandler = (e) => {
    statusEl.textContent = "Upload Completed";
    setTimeout(() => {
      progressBar.style.opacity = 0;
    }, 1000);
  };
  const errorHandler = (e) => {
    statusEl.textContent = "Upload Failed";
  };
  const abortHandler = (e) => {
    statusEl.textContent = "Upload Aborted";
  };

  xhr.addEventListener("load", completeHandler, false);
  xhr.addEventListener("error", errorHandler, false);
  xhr.addEventListener("abort", abortHandler, false);

  xhr.open("POST", "/upload");
  xhr.send(formData);

  console.log(xhr.response);
}
