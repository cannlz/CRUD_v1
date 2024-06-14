

// Обновить пользователя по ID
function updateUser(req, resp, users) {
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

        // Ищем индекс пользователя с полученным id в списке
        let userIndex = users.findIndex(item => item.id === userObj.id);

        // Если нашли, то обновляем данные
        if (userIndex !== -1) {
            users[userIndex] = {...users[userIndex], ...userObj};
            resp.writeHead(201);
            resp.end(JSON.stringify(userObj));

            // Иначе кидаем ошибку 404
        } else {
            resp.writeHead(404);
            resp.end(JSON.stringify({message: "User not found"}));
        }
    });
}

module.exports = updateUser;
