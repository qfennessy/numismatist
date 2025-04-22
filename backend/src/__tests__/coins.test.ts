import request from 'supertest';
import app from '../index';

describe('Coins API', () => {
  let createdId: string;

  it('GET /api/coins returns empty array', async () => {
    const res = await request(app).get('/api/coins');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /api/coins creates a coin', async () => {
    const payload = {
      name: 'Test Coin', origin: 'Roman', period: 'Imperial', year: 100,
      metal: 'Gold', denomination: 'Denarius', emperor: 'Test', description: 'desc',
      condition: 'Fine', diameter: 20, weight: 5, obverseDescription: 'ov', reverseDescription: 'rv',
      acquisitionDate: new Date().toISOString(), acquisitionPrice: 100, estimatedValue: 150,
      images: [], tags: [], notes: [], provenance: [], mint: {}, isPublic: true
    };
    const res = await request(app).post('/api/coins').send(payload);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    createdId = res.body.id;
  });

  it('GET /api/coins/:id returns the created coin', async () => {
    const res = await request(app).get(`/api/coins/${createdId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(createdId);
  });

  it('PUT /api/coins/:id updates the coin', async () => {
    const update = { name: 'Updated Coin', origin: 'Greek', period: 'Classical', year: 200,
      metal: 'Silver', denomination: 'Drachma', emperor: 'Upd', description: 'upd',
      condition: 'Mint', diameter: 22, weight: 6, obverseDescription: 'o2', reverseDescription: 'r2',
      acquisitionDate: new Date().toISOString(), acquisitionPrice: 200, estimatedValue: 250,
      images: [], tags: [], notes: [], provenance: [], mint: {}, isPublic: false
    };
    const res = await request(app).put(`/api/coins/${createdId}`).send(update);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Updated Coin');
  });

  it('DELETE /api/coins/:id removes the coin', async () => {
    const res = await request(app).delete(`/api/coins/${createdId}`);
    expect(res.status).toBe(204);
  });

  it('GET /api/coins/:id after delete returns 404', async () => {
    const res = await request(app).get(`/api/coins/${createdId}`);
    expect(res.status).toBe(404);
  });
});
