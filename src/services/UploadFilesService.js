import http from "../http-common";

class UploadFilesService {
  upload(file, selectedBank, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("bank", selectedBank);

    return http.post("/api/rekening-koran/upload", formData, {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:7011",
        "Content-Type": "multipart/form-data"
      },
      responseType: "arraybuffer",
      onUploadProgress
    }
    ).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute('download',`REPORT__${selectedBank}.xlsx`);
      document.body.appendChild(link);
      link.click();
    });
  }

  
}

export default new UploadFilesService();