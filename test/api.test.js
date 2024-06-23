// Import request from supertest
const request = require('supertest');
//Importing server file
const app = require('../index');

// test token (for admin)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjkyOTYyM2QwOWI3OTY4ODA4NmY5MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxOTExNjkwNn0.dkAVqTrPIGlfEh8znL5W3iM_HH_6rwBwy13pk2lSHwI'

// describe (list of test cases)
describe('API testing', () => {

    //testing '/test' api
    it('GET /test | Response with text', async () => {
        //request sending
        const response = await request(app).get('/test');

        // if its successfull, status code
        expect(response.statusCode).toBe(200);

        // Compare received text
        expect(response.text).toEqual('Test API is Working!');
    });
    // get all products testing
    it('GET Products | Fetch all products', async () => {
        const response = await request(app).get('/api/product/get_all_products');
        expect(response.statusCode).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body.message).toEqual('Product Created Successfully');

    });
    // registration testing
    // 1. sending request (with data)
    // 2. expect : 201
    // 3. if already exist : handle accordingly
    // 4. success
    it('POST /api/user/create | Response with body', async () => {
        const response = await request(app).post('/api/user/create').send({
            "firstName": "Marcus",
            "lastName": "Rashford",
            "email": "rashford@gmail.com",
            "password": "rashford10"
        })
        // if condition
        if (!response.body.success) {
            expect(response.body.message).toEqual('User Already Exists!')
        } else {
            expect(response.body.message).toEqual('User Created Successfully!')
        }
    })

    // Login testing
    // login with "email", "password"
    // expect token (length)
    // expect : userData
    // expect : userData.firstName == 
    // expect : message
    // expect : incorrect password
    it('POST /api/user/login | Successful login should return token and user data', async () => {
        const response = await request(app).post('/api/user/login').send({
            email: 'rashford@gmail.com',
            password: 'rashford10',
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toEqual('User Logged in Successful');
        expect(response.body.token).toBeDefined();
        expect(response.body.token.length).toBeGreaterThan(0);
        expect(response.body.userData).toBeDefined();
        expect(response.body.userData.email).toEqual('rashford@gmail.com');
        expect(response.body.userData.firstName).toEqual('Marcus');
    });

    it('POST /api/user/login | Incorrect password should return error message', async () => {
        const response = await request(app).post('/api/user/login').send({
            email: 'rashford@gmail.com',
            password: 'wrongpassword',
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('Password not matched!');
    });

    it('POST /api/user/login | Non-existent user should return error message', async () => {
        const response = await request(app).post('/api/user/login').send({
            email: 'nonexistent@gmail.com',
            password: 'somepassword',
        });

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toEqual('User not exists!');
    });
});
