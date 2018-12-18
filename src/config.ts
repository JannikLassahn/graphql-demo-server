const env = process.env;
const config = {
    db: {
        connectionString: env.MONGO_URL || 'mongodb://localhost/demodb'
    },
    server: {
        port: env.PORT || 4000
    }
}
export default config;