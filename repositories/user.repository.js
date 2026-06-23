const {read, write} = require("../services/fs.service");
const {userService} = require("../services/user.service");

class UserRepository {
    async getAll() {
        return read();
    }

    async create(user) {
        const users = await read();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: user.name,
            surname: user.surname,
            age: user.age
        }
        users.push(newUser);
        await write(users);
        return newUser;
    }

    async update(id, dto) {
        const users = await read();

        const index = users.findIndex(user => user.id === Number(id));

        if (index === -1) {
            return null;
        }

        users[index] = {...users[index], ...dto};

        users.splice(index, 1, users[index]);

        await write(users);
        return users[index];
    }

    async delete(id){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        users.splice(index, 1);
        await write(users);
    }

    async getById(id){
        const users = await read();
        const index = users.findIndex(user => user.id === Number(id));
        return users[index];
    }
}

const userRepository = new UserRepository();

module.exports = {
    userRepository
}