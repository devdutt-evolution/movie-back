const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies Apis",
      description: "API endpoints for a movie website",
      // contact: {
      //   name: "Desmond Obisi",
      //   email: "info@miniblog.com",
      //   url: "https://github.com/DesmondSanctity/node-js-swagger",
      // },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3001/",
        description: "Local server",
      },
      // {
      //   url: "<your live url here>",
      //   description: "Live server",
      // },
    ],
  },
  // looks for configuration in specified directories
  apis: ["./swagger/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger Page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Documentation in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}
module.exports = swaggerDocs;
