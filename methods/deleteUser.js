

// Удалить пользователя по его ID
function deleteUser(req, resp, users) {
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

        // Ищем id пользователя в списке пользователей, при условии, что список не пуст
        let userIndex = users.findIndex(item => {
            if (users.length > 0) {
                return item.id === userObj.id;
            }
        });

        // Если пользователь найдет, то удаляем
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            resp.writeHead(201);
            resp.end(JSON.stringify(userObj));

            // Иначе кидаем ошибку 404
        } else {
            resp.writeHead(404);
            resp.end(JSON.stringify({message: "User not found"}));
        }

    });
}

module.exports = deleteUser;