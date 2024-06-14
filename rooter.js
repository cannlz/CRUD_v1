let getUser = require('./methods/getUser');
let createUser = require('./methods/createUser');
let updateUser = require('./methods/updateUser');
let deleteUser = require('./methods/deleteUser');

function rooter(req, resp, users, path, method) {
    // Заголовки ответа
    resp.setHeader('Content-Type', 'application/json');

    if (path === '/users' && method === 'GET') {
        // Получить список пользователей/одного пользователя, если передать его id
        getUser(req, resp, users);

    } else if (path === '/users' && method === 'POST') {
        // Создать пользователя по его ID
        createUser(req, resp, users);

    } else if (path === '/users' && method === 'PUT') {
        // Обновить пользователя по ID
        updateUser(req, resp, users);

    } else if (path === '/users' && method === 'DELETE') {
        // Удалить пользователя по его ID
        deleteUser(req, resp, users);

    } else {
        // Если что-то пошло не так(не тот path или method), выдаём 404 с ошибкой
        resp.writeHead(404);
        resp.end(JSON.stringify({message: "Route nor found"}));
    }
}

module.exports = rooter;