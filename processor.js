const db = require("./db");
const THRESHOLD = 20; //hardcoded threshold value- you can change the limit
const accountSid = 'AC8a8e8ffcbb716167408671abd9ae7aa1'
const authToken = "69ef84b32c0a565326c685e6fe6fa75b";

const client = require('twilio')(accountSid, authToken)

//creates postgres database tables
const Processor = {
    async init() {
        const sql = `CREATE TABLE IF NOT EXISTS
        records(
        id SERIAL PRIMARY KEY,
        sensorId VARCHAR(266) NOT NULL,
        time BIGINT NOT NULL,
        value float8 not NULL)`;

        try {
            await db.query(sql, []);
            console.log("Database initialized successfully");
        } catch (error) {
            console.log(error);
        }
    },

    async create(request, response) {
        let {
            sensorId,
            time,
            value
        } = request.body;
        let errors = [];

        if (!sensorId) errors.push("Sensor ID required");
        if (!time) errors.push("Time required");
        if (value > THRESHOLD) {
            errors.push("Threshold reached");
            client.messages.create({
                to: "+447774519663", //hardcoded receiver phone number
                from: "+13073171405",
                body: 'Threshold exceeded!'
            })
                .then(message => console.log('message sent'));
        }

        if (errors.length > 0) {
            response.status(400).json({
                message: "Failed",
                errors: errors,
            });
            return;
        }

        try {
            await db.query(
                "INSERT INTO records(sensorId,time,value) VALUES($1,$2,$3)", [sensorId, time, value]
            );
            return response.status(201).json({
                message: "Success",
                error: errors,
            });
        } catch (error) {
            console.log(error.message);
            errors.push("An error was encountered");
            return response.status(500).json({
                message: "Failed",
                errors: errors,
            });
        }
    },

    async get(request, response) {
        let {
            sensorId
        } = request.body;
        let errors = [];

        if (!sensorId) errors.push("Sensor ID required");

        if (errors.length > 0) {
            response.status(400).json({
                message: "Failed",
                errors: errors,
            });
            return;
        }

        try {
            const {
                rows,
            } = await db.query(
                "SELECT sensorId,time,value FROM records WHERE sensorId=$1", [sensorId]
            );
            return response.status(201).json({
                message: "Success",
                error: errors,
                data: rows,
            });
        } catch (error) {
            console.log(error.message);
            errors.push("An error was encountered");

            return response.status(500).json({
                message: "Failed",
                errors: errors,
            });
        }
    },
};

module.exports = Processor;