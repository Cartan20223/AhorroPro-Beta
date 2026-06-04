import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: "mysql://root:brahian2015%3F@127.0.0.1:3306/sobreahorro",
  },
});