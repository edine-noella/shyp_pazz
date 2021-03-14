# shypment backend
Shypment server application
<br>

# Setups and Tools
- Postgresql
- Node
- API testing env tool (Postman recommended)
- Code editor (Vs code recommended)

# Quickly getting started
- Clone the repository `https://github.com/PatrickNiyogitare28/shypment-backend.git`

- Run `npm install` to install packages

- Create `.env` file, fill it with scripts in `.env.example` with actual values where not specified

- Run `npm run start:dev` to run the development server

- Run `npm run build` to build the app (Optional)

- Run `npm run start:prod` to run the production server (Optional)

- Run `npm run test` to run tests (Optional)


# Creating a model
To create a model run a below like command. The case below is to create a TestUser model 

``sequelize model:generate --name User --attributes name:string,email:string,password:string,phone:integer``

# Running migrations
Migrations are run to udated the local/product tables

``npm run migrate``

# Generating a seed
`sequelize seed:gerate --name <modelName/tableName>`

# Running seeds
Seed are run to have the sample data in database tables

``npm run seed``

# Authors 

- patrickniyogitare28@mgail.com
- edinenoella@gmail.com
- benedictokoliechinedu@gmail.com

