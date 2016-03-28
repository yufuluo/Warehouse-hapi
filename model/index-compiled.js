'use strict';

module.exports = function (mongoose) {
    var schema = mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        image: String
    });

    var Storage = mongoose.model('Storage', schema);;

    return {
        Storage: Storage
    };
};

//# sourceMappingURL=index-compiled.js.map