module.exports = {
  corsAllowOrigin: process.env.CORS_ALLOW_ORIGIN || 'http://localhost:9000',
  apiPrefix: '/api',
  development: {
    mysql: {
      host     : 'us-cdbr-iron-east-03.cleardb.net',
      user     : process.env.BOBIZ_USER,
      password : process.env.BOBIZ_PASS,
      database : process.env.BOBIZ_DB
    },
    port: 5008,
    app: {
      name: 'bobiz dev'
    }
  },
  test: {
    port: 5009,
    app: {
      name: 'bobiz test'
    }
  },
  stage: {
    port: process.env.PORT,
    app: {
      name: 'bobiz stage'
    }
  },
  production: {
    port: process.env.PORT || 5000,
    name: 'bobiz',
    mysql: {
      host     : 'us-cdbr-iron-east-03.cleardb.net',
      user     : process.env.BOBIZ_USER,
      password : process.env.BOBIZ_PASS,
      database : process.env.BOBIZ_DB
    }
  }
};
