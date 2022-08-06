const { v4: uuid } = require('uuid');
const { execSync } = require('child_process');
const NodeEnvironment = require('jest-environment-node').default;
const { resolve } = require('path');
const { Client } = require('pg');

require('dotenv').config({
    path: resolve(__dirname,"..",".env.test")
})

class CustomEnvironment extends NodeEnvironment {

    constructor(config) {
        super(config);
        
        this.schema = `test_schema_${uuid()}`;
        this.originalConnectionString = `${process.env.DATABASE_URL}`
        this.connectionString = `${process.env.DATABASE_URL}${this.schema}`
    }

    setup() {
        process.env.DATABASE_URL = this.connectionString;
        this.global.process.env.DATABASE_URL = this.connectionString;
        
        execSync(`prisma migrate dev`);
    }

    async teardown() {
        const client = new Client({
            connectionString: this.connectionString
        });
        
        await client.connect();
        await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`);
        await client.end();

        process.env.DATABASE_URL = this.originalConnectionString;
        this.global.process.env.DATABASE_URL = this.originalConnectionString;
    }
}

module.exports = CustomEnvironment;