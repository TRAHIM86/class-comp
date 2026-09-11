import { z } from 'zod';

// в схему передаем список стран как параметр, т.к. вытянуть
// его из стора можно только в компоненте (схема не компонент)
export const userSchema = (countriesEU: string[]) =>
  z
    .object({
      name: z.string().regex(/^[A-Z]/, 'The first letter is capitalized'),
      age: z.coerce.number().positive('Positive number only'),
      email: z.string().refine((val) => {
        const parts = val.split('@');

        // д.б. только две части
        if (parts.length !== 2) {
          return false;
        }

        // первая часть - не пустая
        const firstPart = parts[0];
        if (firstPart.length === 0) {
          return false;
        }

        // во второй части минимум 1 точка
        const secondPart = parts[1];
        if (!secondPart.includes('.')) {
          return false;
        }

        // точка не в начале и не в конце
        if (secondPart.startsWith('.') || secondPart.endsWith('.')) {
          return false;
        }

        // если подходит под формат емайл
        return true;
      }, 'Invalid email'),
      gender: z.enum(['male', 'female'], { message: 'Select gender' }),
      agree: z.boolean().refine((val) => val === true, 'Accept the terms'),
      password: z
        .string()
        .regex(/\d/, 'Min 1 digit')
        .regex(/[A-Z]/, 'Min 1 UP letter')
        .regex(/[a-z]/, 'Min 1 low letter')
        .regex(/[!@#$%^&*]/, 'Min 1 special'),
      confirm: z.string(),
      image: z
        // custom - ожидает значение типа FileList и не проверяет его,
        // FileList - объект кот приходит в <input type="file"> (список файлов)
        .custom<FileList>()

        // первая проверка - файл обязателен
        .refine((files) => files?.length > 0, 'File is required')

        // вторая проверка на формат
        .refine(
          (files) =>
            ['image/png', 'image/jpeg', 'image/jpg'].includes(files?.[0]?.type),
          'Only PNG or JPEG'
        )

        // третья проверка на размер
        .refine(
          (files) => files?.[0]?.size <= 5 * 1024 * 1024,
          'No more than 5MB'
        ),
      country: z
        .string()
        .refine(
          (val) => countriesEU.includes(val),
          'Select a country from the list'
        ),
    })

    // здесь refine для ВСЕГО объекта с валидациями, т.к.
    // проверяем не конкретное поле, а всеь объект и в нем
    // data.password === data.confirm
    .refine((data) => data.password === data.confirm, {
      message: 'Passwords do not match',
      path: ['confirm'],
    });
