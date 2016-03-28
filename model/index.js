'use strict';

module.exports = (mongoose) => {
    let schema = mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        image: String
    });

    let Storage = mongoose.model('Storage', schema);;

    return {
        Storage: Storage
    };
};