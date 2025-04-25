const envs = {
  PORT: parseInt(process.env.PORT || "3000"),
  API_KEY: process.env.API_KEY || "",
  JWT_SEED: process.env.JWT_SEED || "",
  URL_FRONTEND: process.env.URL_FRONTEND || "",
  MONGO_URI: process.env.MONGO_URI,
};

module.exports = envs;
