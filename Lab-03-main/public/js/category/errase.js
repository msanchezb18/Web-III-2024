/* eslint-disable no-undef */
// JavaScript Document
var db = firebase.firestore();
var container = firebase.storage().ref();

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const docId = urlParams.get("cod");
  var docRef = db.collection("Categories").doc(docId);

  docRef.get().then(function (doc) {
    if (doc.exists) {
      const urlImage = doc.data().urlImage;

      // Obtener la ruta relativa del archivo desde la URL completa
      const parts = urlImage.split("/");
      const relativePath = parts.slice(3).join("/");

      console.log("Ruta relativa del archivo:", relativePath); // Imprimir la ruta relativa para verificar que sea la misma

      var acceptButton = document.getElementById("acceptButton");
      if (acceptButton) {
        acceptButton.addEventListener("click", function () {
          erraseData(docId, relativePath); // Pasar la ruta relativa en lugar de la URL completa
        });
      }
    } else {
      console.error("No se encontró 'cod' en la URL o es undefined.");
    }
  });
});

function erraseData(docId, relativePath) {
  // Recibir la ruta relativa como argumento
  if (relativePath) {
    // Verificar si el archivo existe antes de intentar eliminarlo
    container
      .child(relativePath)
      .getDownloadURL()
      .then(function () {
        // El archivo existe, se puede eliminar
        container
          .child(relativePath)
          .delete()
          .then(function () {
            console.log("File deleted successfully.");
            // Después de eliminar el archivo, elimina el documento de Firestore
            db.collection("Categories")
              .doc(docId)
              .delete()
              .then(function () {
                console.log("Document successfully deleted.");
                alert("Archivo eliminado exitosamente.");
              })
              .catch(function (error) {
                console.error("Error removing document:", error);
              });
          })
          .catch(function (error) {
            console.error("Error deleting file:", error);
          });
      })
      .catch(function (error) {
        // El archivo no existe
        console.error("File does not exist:", error);
        alert("El archivo no existe en el almacenamiento.");
      });
  } else {
    console.error("relativePath is undefined or null.");
  }
}
