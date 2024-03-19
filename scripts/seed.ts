import prisma from "@/app/lib/db";

const { PrismaClient } = require("@prisma/client");
const { db } = require("@vercel/postgres");
const { hash } = require("bcrypt");

// const { db } = require("@vercel/postgres");

//const {patients } = require("../app/lib/placeholder-data");

// async function seedUsers(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//     // Create the "users" table if it doesn't exist
//     const createTable = await client.sql`
//         CREATE TABLE IF NOT EXISTS users (
//           id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//           name VARCHAR(255) NOT NULL,
//           email TEXT NOT NULL UNIQUE,
//           password TEXT NOT NULL
//         );
//       `;

const init = async () => {
  const userSeed = [
    {
      name: "Fernando",
      email: "fernando@gmail.com",
      password: "123456",
    },
    {
      name: "walter",
      email: "walter@gmail.com",
      password: "123456",
    },
  ];

  const client = await db.connect();
  await Promise.all(
    userSeed.map(async (user) => {
      const hashedPassword = await hash(user.password, 10);
      return client.sql`
            INSERT INTO users (name, email, password)
            VALUES ( ${user.name}, ${user.email}, ${hashedPassword})
            ON CONFLICT (id) DO NOTHING;
          `;
    })
  );
};

init();

async function main() {
  // ... you will write your Prisma Client queries here
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

//     console.log(`Seeded ${insertedUsers.length} users`);
//     return {
//       createTable,
//       users: insertedUsers,
//     };
//   } catch (error) {
//     console.error("Error seeding users:", error);
//     throw error;
//   }
// }

// async function seedPatients(client) {
//   try {
// const createTable = await client.sql`
//   CREATE TABLE IF NOT EXISTS patient (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     n_documento BIGINT,
//     tipo_documento VARCHAR(255),
//     nombres VARCHAR(255),
//     apellidos VARCHAR(255),
//     genero VARCHAR(255),
//     fecha_nacimiento DATE,
//     telefono BIGINT,
//     correo VARCHAR(255) UNIQUE,
//     user_id UUID REFERENCES users(id) ON DELETE CASCADE
//   );
// `;

//     const insertedPatients = await Promise.all(
//       patients.map(async (pat) => {
//         return client.sql`
//           INSERT INTO patient (n_documento, tipo_documento, nombres, apellidos, genero, fecha_nacimiento, telefono, correo, user_id)
//           VALUES (${pat.n_documento}, ${pat.tipo_documento}, ${pat.nombres}, ${pat.apellidos}, ${pat.genero}, ${pat.fecha_nacimiento}, ${pat.telefono}, ${pat.correo}, ${pat.user_id})
//           ON CONFLICT (id) DO NOTHING;
//         `;
//       })
//     );

//     console.log(`Seeded ${insertedPatients.length} patients`);

//     return {
//       // createTable,
//       patients: insertedPatients,
//     };
//   } catch (error) {
//     console.error("Error seeding patients:", error);
//     throw error;
//   }
// }

// async function seedClinicalH(client) {
//   try {
//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS clinical_h (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         diagnosis TEXT,
//         patient_id UUID REFERENCES patient(id) ON DELETE CASCADE
//       );
//     `;

//     // const insertedClinicalH = await Promise.all(
//     //   clinicalHRecords.map(async (record) => {
//     //     return client.sql`
//     //       INSERT INTO clinical_h (diagnosis, patient_id)
//     //       VALUES (${record.diagnosis}, ${record.patient_id})
//     //       ON CONFLICT (id) DO NOTHING;
//     //     `;
//     //   })
//     // );

//     // console.log(`Seeded ${insertedClinicalH.length} clinicalH records`);

//     return {
//       createTable,
//       // clinicalHRecords: insertedClinicalH,
//     };
//   } catch (error) {
//     console.error("Error seeding clinicalH records:", error);
//     throw error;
//   }
// }

// // async function seedAppointments(client) {
// //   try {
// //     const createTable = await client.sql`
// //       CREATE TABLE IF NOT EXISTS appointment (
// //         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
// //         lugar VARCHAR(255),
// //         hora TIME,
// //         fecha DATE,
// //         patient_id UUID REFERENCES patient(id) ON DELETE CASCADE
// //       );
// //     `;

// //     const insertedAppointments = await Promise.all(
// //       appointments.map(async (appointment) => {
// //         return client.sql`
// //           INSERT INTO appointment (lugar, hora, fecha, patient_id)
// //           VALUES (${appointment.lugar}, ${appointment.hora}, ${appointment.fecha}, ${appointment.patient_id})
// //           ON CONFLICT (id) DO NOTHING;
// //         `;
// //       })
// //     );

// //     console.log(`Seeded ${insertedAppointments.length} appointments`);

// //     return {
// //       createTable,
// //       appointments: insertedAppointments,
// //     };
// //   } catch (error) {
// //     console.error("Error seeding appointments:", error);
// //     throw error;
// //   }
// // }

// // async function seedOdontograms(client) {
// //   try {
// //     const createTable = await client.sql`
// //       CREATE TABLE IF NOT EXISTS odontogram (
// //         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
// //         gram TEXT,
// //         clinicalH_id UUID REFERENCES clinical_h(id) ON DELETE CASCADE
// //       );
// //     `;

// //     const insertedOdontograms = await Promise.all(
// //       odontograms.map(async (odontogram) => {
// //         return client.sql`
// //           INSERT INTO odontogram (gram, clinicalH_id)
// //           VALUES (${odontogram.gram}, ${odontogram.clinicalH_id})
// //           ON CONFLICT (id) DO NOTHING;
// //         `;
// //       })
// //     );

// //     console.log(`Seeded ${insertedOdontograms.length} odontograms`);

// //     return {
// //       createTable,
// //       odontograms: insertedOdontograms,
// //     };
// //   } catch (error) {
// //     console.error("Error seeding odontograms:", error);
// //     throw error;
// //   }
// // }

// async function main() {
//   try {
//     await init();
//   } catch (error) {
//     console.log(error);
//   }
//   // const client = await db.connect();

//   // try {
//   //   // await seedUsers(client)
//   //   await seedPatients(client);
//   //   // await seedClinicalH(client);
//   //   // await seedOdontograms(client);
//   //   // await seedAppointments(client);
//   // } catch (error) {
//   //   console.error(
//   //     "An error occurred while attempting to seed the database:",
//   //     error
//   //   );
//   // } finally {
//   //   await client.end();
//   // }
// }

// main().catch((err) => {
//   console.error("An error occurred in main:", err);
// });

//ultima actualizacion
