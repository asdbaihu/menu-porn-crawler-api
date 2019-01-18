module.exports = Object.freeze({  
  mode   : 'production'
  , port   : 3000
  , host   : 'menu-porn-api.com'
  , db: {
    schema: process.env.DB_SCHEMA,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
});
