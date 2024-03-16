

const { db } = require('@vercel/postgres');
const {
  users,
} = require('../app/lib/placeholder-data');
const bcrypt = require('bcrypt');


const init = async () => {
  const client = await db.connect();
  await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
            INSERT INTO users (name, email, password)
            VALUES ( ${user.name}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
          `;
    })
  );
};

init();
