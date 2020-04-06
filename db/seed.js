const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Meme = require('../lib/models/Meme');

module.exports = async({ usersToCreate = 10, memesToCreate = 100 } = {}) => {
  const loggedInUser = await User.create({
    username: 'pajamas',
    password: 'password',
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: `${chance.name()} ${chance.name()}`,
    password: chance.animal(),
    profilePhotoUrl: chance.url()
  })));

  await Meme.create([...Array(memesToCreate)].map(() => ({
    image: chance.url(),
    top: chance.sentence(),
    bottom: chance.word(),
    user: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
  })));

};
