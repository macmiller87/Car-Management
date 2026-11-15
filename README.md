# Car-Management

- This is an app for managing Cars and Drivers, it must be possible to create a `Driver`, `Car` and book a reservation of a valid car as well as a valid driver.

### 🚀 Technologies

- Node.js in version v26.13.0 (LTS)
- Express
- Postgres
- PrismaORM
- Docker
- Jest
- Supertest
- Babel

### 🚀 End-Points

- Use an http request provider such as `Insomnia` or `Postman` and even the `ThunderClient` extention on vscode IDE to create all the follow endpoints, to be able to test the app.

#### Cars

###### POST: `/createCar`

- It's required to set 4 parameters as a field's value, trough http body method.

- `carName`: string
- `carLicensePlate`: string
- `color`: string
- `brand`: string

###### PTCH: `/updateCar`

- It's required to set 2 parameters as a field's value, trough http body method.

- `carName`: string
- `color`: string

###### DELETE: `/deleteCar`

- It's not required to set any field trough http body method.

###### GET: `/searchCar`

- It's required to set `car_id` (uuid) as a parameter trough http headers method.

###### GET: `/searchAllCars`

- It's required to set 2 parameters as a field's value, trough http body method.

- `color`: string   
- `carName`: string

#### Drivers

###### POST: `/createDriver`

- It's required to set 1 parameter as a field's value, trough http body method.

- `driverName`: string

###### PTCH: `/updateDriver`

- It's required to set 1 parameters as a field's value, trough http body method, and `driver_id` (uuid) trough http query method.

- `driverName`: string

###### DELETE: `/deleteDriver`

- It's not required to set any field trough http body method, just `driver_id` (uuid) trough http query method. 

###### GET: `/searchDriver`

- It's required to set `driver_id` (uuid) as a parameter trough http query method.

###### GET: `/driverSearchByName`

- It's required to set `driver_name` as a parameter trough http headers method.

#### Cars Registration

###### POST: `/createCarRegistration`

- It's required to set 3 parameters as a field's value, trough http body method.

- `driverName`: string
- `carName`: string
- `reason_for_use`: string

###### POST: `/finishCarRegistration`

- It's required to set 1 parameters as a field's value, trough http body method, and `carRegistration_id` (uuid) trough http query method.

- `driverName`: string

###### GET: `/searchAllCarsRegistration`

- It's not required to set any field trough any http method.

### 🛠️ About .env.example file

- Make sure that all the enviroment variables is filled with the rigth configurations, you can rename this file after do it from `.env.example` to `.env`, or create a new one ........... it is very `IMPORTANT` to the all the stuffs work well.

- `IMPORTANT`, when you just want to run the application, keep attention on this variable `DATABASE_URL`, in the current configuration of the file it's thhe rigth way to run the application, but when you decide to run de `tests`, you gonna need to change this one `DATABASE_URL`, I mean you need to comment the current variable and uncomment the second variable with the same name. 

- `IMPORTANT`, For finish after fill in the values of the variables, replace the values at the variable's name on `DATABASE_URL` variables.

### 🛠️🚀 How to run this application

- After ckeck the previous steps, if you have a docker installed (if not, you will need to install), you just need to run the following comand `yarn docker:up`, after docker is ok, open a second terminal and run `yarn setup:prisma`, note, that just need to run for the first time, for configure `prismaORM` stuffs, then you can run `yarn dev`.

- Note if you are using a different package manager such as (npm, pnpm etc), just replace (yarn) at the previous step.

- You can run `npx prisma studio`, to see and work with migrations.

### 📚 About the architecture of the application.

- This app was created as the same as `MVC` architecture, trying to keep the good organization and responsability of the layers, to make easy to give maintenance and to be able to implement new stuffs as well.

### 📦 How to run the Database Interface too of PrismaORM.

- For run just type in a windown of your terminal `npx prisma studio`.

### ✅ How to run the Tests of the App.

- `IMPORT`, check and make sure to config the steps wrote in the section `🛠️ About .env.example file` then: first run `yarn docker:up`, when docker has been ok type, `yarn setup:prisma` note, that just need to run for the first time, for configure `prismaORM` stuffs, then type `yarn test` on your windown terminal.