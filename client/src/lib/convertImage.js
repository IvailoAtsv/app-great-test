
export default function convertImageToBase64 (imageFile) {
    return new Promise((resolve, reject) => {
      if (!imageFile) {
        return reject(new Error('No image provided'));
      }

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };