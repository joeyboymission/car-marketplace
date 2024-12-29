/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://car-marketplace_owner:LFEx8WaT0gNb@ep-rough-shape-a55n8d3q.us-east-2.aws.neon.tech/car-marketplace?sslmode=require'
    }
};