const express = require("express");
const {userService} = require("./services/user.service");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // використання body в різних форматах

app.get('/users', async (req, res)=>{
    const data = await userService.getAll();
    res.json(data);
})

app.post('/users', async (req, res)=>{
    const user = req.body;
    const data = await userService.create(user);
    res.json(data);
})

app.put('/users/:id', async (req, res)=>{
    const userId = req.params.id;
    const dto = req.body;
    const data = await userService.update(userId, dto);
    res.json(data);
})

app.delete('/users/:id', async (req, res)=>{
    const userId = req.params.id;
    const data = await userService.delete(userId);
    res.end();
})

app.get('/users/:id', async (req, res)=>{
    const id = req.params.id;
    const data = await userService.getById(id);
    res.json(data);
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});