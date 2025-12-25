let fileInput, uploadBtn;

document.addEventListener("DOMContentLoaded", () => {
  fileInput = document.getElementById("file");
  uploadBtn = document.getElementById("upload-btn");

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

  try {
    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
