// Принимает File, возвращает Promise со строкой base64
export const fileToBase64 = (fileImg: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // FileReader - втроеный объект для чтения файлов
    const reader = new FileReader();

    // onLoadend - событие после чтения файла
    reader.onloadend = () => {
      // reader.result - результат чтения файла
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Error reading file IMG');
      }
    };

    // запуск чтения файла
    reader.readAsDataURL(fileImg);
  });
};
