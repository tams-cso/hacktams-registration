import mongoose, { Schema } from 'mongoose';

const clientSchema = new Schema({
    id: String,
});

const Client = mongoose.model('Client', clientSchema, 'client');

export default Client;