  
const { getMemes, getMeme, getUser, getAgent } = require('../db/data-helpers');

describe('memes routes', () => {
  it('creates a meme', async() => {
    const user = await getUser({ username: 'pajamas' });
    
    return getAgent()
      .post('/api/v1/memes')
      .send({
        image: 'background pic',
        top: 'top text',
        bottom: 'bottom text',
        user: user._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          image:  expect.any(String),
          top:  expect.any(String),
          bottom: expect.any(String),
          user: expect.any(String),
          __v: 0
        });
      });
  });
  
  it('gets a memee by id', async() => {
    const user = await getUser({ username: 'pajamas' });
    const meme = await getMeme({ user: user._id });

    return getAgent()
      .get(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual({
          ...meme,
          user: user._id
        });
      });
  });

  it('gets all of the memes', async() => {
    const memes = await getMemes();
    return getAgent()
      .get('/api/v1/memes')
      .then(res => {
        expect(res.body).toEqual(memes);
      });
  });

  it('updates a meme by id', async() => {
    const user = await getUser({ username: 'pajamas' });
    const meme = await getMeme({ user: user._id });
    return getAgent()
      .patch(`/api/v1/memes/${meme._id}`)
      .send({ top: 'thought of something funnier' })
      .then(res => {
        expect(res.body).toEqual({
          ...meme,
          top: 'thought of something funnier'
        });
      });
  });

  it('deletes a meme', async() => {
    const user = await getUser({ username: 'pajamas' });
    const meme = await getMeme({ user: user._id });

    return getAgent()
      .delete(`/api/v1/memes/${meme._id}`)
      .then(res => {
        expect(res.body).toEqual(meme);
      });
  });
});
