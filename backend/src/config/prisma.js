const { PrismaClient } = require('../../generated/prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

const connectionString = process.env.DATABASE_URL || 'mysql://root:brahian2015%3F@127.0.0.1:3306/sobreahorro';

const adapter = new PrismaMariaDb(connectionString);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
