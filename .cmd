npm i express prisma pg winston moment express-useragent cors cookie-parser joi bcrypt moment
npm i -D @types/moment @types/express @types/pg @types/winston @types/moment @types/moment-timezone @types/express-useragent @types/cors @types/cookie-parser @types/joi @types/bcrypt @types/jest jest @types/supertest supertest
npm install prisma --save-dev
npx prisma init --datasource-provider mysql
npx prisma migrate dev --name init