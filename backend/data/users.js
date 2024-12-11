import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'Ori Nadjar',
        email: 'ori@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Noam Mazuz',
        email: 'noam@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];

export default users;