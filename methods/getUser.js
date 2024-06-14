
function getUser(req, resp, users) {
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

        // Если указан ID, то выводим информацию о пользователе с полученным ID 
        if (body.length > 0) {
            let userIndex = users.findIndex(item => item.id === userObj.id);
            if (userIndex !== -1) {
                resp.writeHead(200);
                resp.end(JSON.stringify(users[userIndex]));
            } else {
                resp.writeHead(200);
                resp.end(JSON.stringify({message: "User not found"}));
            }
            // Иначе выводим список всех пользователей
        } else {
            resp.writeHead(200);
            resp.end(JSON.stringify(users));
        }
    });
}

module.exports = getUser;