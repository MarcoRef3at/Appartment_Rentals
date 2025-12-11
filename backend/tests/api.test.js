const request = require('supertest');
const app = require('../src/server');
const { sequelize } = require('../src/models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Smart Stay Platform API', () => {
  let token;
  let userId;
  let propertyId;
  let guestId;
  let bookingId;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test Host',
        role: 'host'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('userId');
    userId = res.body.userId;
  });

  it('should login and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  it('should create a property', async () => {
    const res = await request(app)
      .post('/api/properties')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'My Smart Apartment',
        address: { city: 'New York', street: '5th Ave' },
        timezone: 'America/New_York',
        default_wifi_ssid: 'SmartStay_Guest',
        default_wifi_password: 'securewifi'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toEqual('My Smart Apartment');
    propertyId = res.body.id;
  });

  it('should create a guest', async () => {
    const res = await request(app)
      .post('/api/guests')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Guest',
        email: 'guest@example.com',
        phone: '+1234567890'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    guestId = res.body.id;
  });

  it('should create a booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        property_id: propertyId,
        guest_id: guestId,
        start_date: '2023-12-25',
        end_date: '2023-12-30',
        total_amount: 500.00,
        currency: 'USD'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.status).toEqual('pending');
    bookingId = res.body.id;
  });

  it('should list properties', async () => {
    const res = await request(app)
        .get('/api/properties')
        .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should list bookings', async () => {
    const res = await request(app)
        .get('/api/bookings')
        .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].property).toBeDefined(); // Check include
    expect(res.body[0].guest).toBeDefined(); // Check include
  });
});
