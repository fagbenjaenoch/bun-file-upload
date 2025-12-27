let fileInput, uploadBtn, progressBar, statusEl, statusText;

document.addEventListener("DOMContentLoaded", () => {
  fileInput = document.getElementById("file");
  uploadBtn = document.getElementById("upload-btn");
  progressBar = document.getElementById("progress-bar");
  statusEl = document.getElementById("status");
  statusText = document.getElementById("status-text");

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
  statusEl.setAttribute("data-state", "loading");

  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener("progress", (e) => {
    if (e.lengthComputable) {
      const percentCompleted = Math.round((e.loaded / e.total) * 100);

      progressBar.value = percentCompleted;
      statusText.textContent = `${percentCompleted}% uploaded`;
    }
  });

  const completeHandler = (e) => {
    statusText.textContent = "Upload Completed";
    statusEl.setAttribute("data-state", "completed");

    setTimeout(() => {
      progressBar.style.opacity = 0;
    }, 1000);

    console.log(JSON.parse(xhr.response));
  };
  const errorHandler = (e) => {
    statusText.textContent = "Upload Failed";
    statusEl.setAttribute("data-state", "failed");
  };
  const abortHandler = (e) => {
    statusText.textContent = "Upload Aborted";
    statusEl.setAttribute("data-state", "aborted");
  };

  xhr.addEventListener("load", completeHandler, false);
  xhr.addEventListener("error", errorHandler, false);
  xhr.addEventListener("abort", abortHandler, false);

  xhr.open("POST", "/upload");
  xhr.send(formData);
}
