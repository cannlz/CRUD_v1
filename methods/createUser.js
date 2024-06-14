

// Создание пользователя
function createUser(req, resp, users) {
    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        let userObj = {};

        // Конвертируем ответ из строки в obj(key: value)
        body.split("&").forEach(data => {
            let keyValue = data.split("=");
            userObj[keyValue[0]] = keyValue[1];
        });

        userObj["id"] = Math.random().toString(36).slice(2, 10); // Генерация рандомного ID
        users.push(userObj); // Добавляем пользователя в массив
        resp.writeHead(201);
        resp.end(JSON.stringify(userObj)); // Выводим информацию о данном пользователе
    });
}

module.exports = createUser;