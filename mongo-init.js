db.createUser(
    {
        user: "user",
        pwd: "user",
        roles: [
            {
                role: "readWrite",
                db: "nodejs_practice_new",
            },
        ]
    }
)