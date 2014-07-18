define(function () {

    'use strict';

    var Storage = {
        setDropbox: function (db, callback) {

            var self = this;

            this.db = {Dropbox : db};

            var datastoreManager = db.getDatastoreManager();

            datastoreManager.openDefaultDatastore(function (error, datastore) {

                if (error) {
                    throw error;
                }

                var table = datastore.getTable(self.recordName);
                self.db.record = table.getOrInsert(self.recordName, '');

                callback(self);
            });
        },
        getItem: function (key) {
            var value = this.db.record.get(key);

            return JSON.parse(value);
        },
        setItem: function (key, value) {
            value = JSON.stringify(value);

            return this.db.record.set(key, value);
        }
    };

    return Storage;
});