# Руководство

### Установка зависимостей

Для установки необходимых модулей выполните команду:

```
npm install
```

### Запуск программы

```
npm start
```

### Сервер доступен по адресу

```
http://localhost:8080
```

## Эндпоинты

```
1. /upload
2. /ask
3. /search
```

## Загрузка файла

```
Запрос => [POST] /upload

{
    file: 'ваш файл'
}

Ответ =>
{
    success: true || false,
    fileId: 'filesidffwfwwfe'
}
```

## Отправка вопроса

```
Запрос => [POST] /ask

{
    fileID: "fondh39uj3hdnkwlw",
    question: "ваш вопрос"
}

Ответ =>
{
    success: true || false,
    response: 'filesidffwfwwfe'
}
```

## Переменные окружения (.env)

```
OPENAI_API_KEY =
SERPAPI_API_KEY =
```

Если у вас есть дополнительные вопросы или изменения, не стесняйтесь спрашивать!
