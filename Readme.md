# qo'llanma

### dasturni ishga tushirish

```
npm start
```

## Endpoints

```
   1. /uploads
   2. /ask
```

## upload file

```
   request => [POST] /uploads

    {
        file:'your file'
    }


    response =>
    {
        success:true || false
        fileId:filesidffwfwwfe
    }
```

## send question

```
   request => [POST] /ask

    {
        fileID:"fondh39uj3hdnkwlw",
        question:"your question"
    }


    response =>
    {
        success:true || false
        response:filesidffwfwwfe
    }
```
