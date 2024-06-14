let startServer = require('./server');
let rooter = require('./rooter');

const url = require('url');

// Массив для хранения пользователей
let users = [];

// Обработка запросов
const requestHandler = ((req, resp) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;

    // Запускаем rooter для обработки входящих запросов
    rooter(req, resp, users, path, method);
});

// Запускаем сервер
startServer(requestHandler);