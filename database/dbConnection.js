

import mongoose from "mongoose";

export function dbConnection () {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('database connection established'))
        .catch((error) => console.log(error))
}