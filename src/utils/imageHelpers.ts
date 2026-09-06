// функция выбора и загрузки картинки
export function handleImage(
  e: React.ChangeEvent<HTMLInputElement>
): Promise<string> | undefined {
  // выбранный файл [0] в инпуте файлов
  const currentFile = e.target.files?.[0];

  // если файла нет - выходим
  if (!currentFile) {
    return;
  }

  // проверяем тип файла Если не (png, jpeg) алерт и выходим.
  if (!['image/png', 'image/jpeg'].includes(currentFile.type)) {
    alert('Only PNG or JPEG format image');
    return;
  }

  // проверяем размер. Если больше 5 - возврат
  if (currentFile.size > 5 * 1024 * 1024) {
    alert('Size image must not be more 5 MB');
    return;
  }

  // создаем экземпляр FileReader - объект который читает
  // преобразовывает файлы в разыне форматы
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    // приклеиваем функцию, которая выполнится когда файл прочитается
    // onloadend - это евент, который сработает после чтения файла
    reader.onloadend = () => {
      // только строка! reader.result — это результат чтения файла
      // это строка base64
      if (typeof reader.result === 'string') {
        // поместить в состояние image текущую строку base64
        resolve(reader.result);
      } else {
        reject('Error reading file');
      }
    };
    // readAsDataURL - втроенный метод, читает файл и преобразует его
    // в data URL (т.е. строку, начинающуюся с data:image/png;base64)
    // после преобразования в строку вызывается авт-ки reader.onloadend
    reader.readAsDataURL(currentFile);
  });
}
