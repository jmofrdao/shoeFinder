const client = require('./client')
const {createUser} = require('./users')
const {createShoes} = require('./shoes')
async function dropTables () {
try {
    await client.query(`
    DROP TABLE IF EXISTS shoes;
    DROP TYPE IF EXISTS shoeState;
    DROP TABLE IF EXISTS users;
    `)
} catch (error) {
    throw error
}
}

async function createTables () {
    await client.query(`
    CREATE TYPE shoeState AS ENUM ('Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming');
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
    );
    CREATE TABLE shoes (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES users(id),
        brand VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state shoeState NOT NULL,
        description TEXT NOT NULL,
        size INTEGER
    )
    `)
}

async function createInitialUser () {
    try {
        const usersToCreate = [
          { username: "albert", password: "bertie99" },
          { username: "sandra", password: "sandra123" },
          { username: "glamgal", password: "glamgal123" },
        ];
        const users = await Promise.all(usersToCreate.map(createUser));
    
        console.log("Users created:");
        console.log(users);
        console.log("Finished creating users!");
      } catch (error) {
        console.error("Error creating users!");
        throw error;
      }
}

async function createInitialShoes() {
    console.log("Starting to create shoes");
  
    const shoesToCreate = [
      {
        creatorId: 1,
        brand: 'Nike',
        name: "Men's Waffle Trainer 2 SE",
        city: 'Chicago',
        state: "Illinois",
        description: "Brand new, never been worn",
        size: '10'
        
      },
      {
        creatorId: 3,
        brand: 'Adidas',
        name: "Ultra Boost",
        city: 'Dallas',
        state: "Texas",
        description: "Brand new, never been worn",
        size: '12'
        
      },
      {
        creatorId: 2,
        brand: 'New Balance',
        name: "574 Core",
        city: 'Oklahoma City',
        state: "Oklahoma",
        description: "Good condition, worn a couple of times",
        size: '13'
        
      },
      
    ];
    const shoes = await Promise.all(
      shoesToCreate.map((shoe) => createShoes(shoe))
    );
  
    console.log("shoes created:");
    console.log(shoes);
  
    console.log("Finished creating shoes");
  }

async function rebuildDB() {
    try {
        await dropTables();
        await createTables();
        await createInitialUser();
        await createInitialShoes();
    } catch (error) {
        throw error
    }
}

module.exports = {
    rebuildDB,
    dropTables,
    createTables,
  };