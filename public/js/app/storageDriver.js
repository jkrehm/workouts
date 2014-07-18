define(['lodash', 'dropbox', 'json!configuration.json', 'app/drivers/storage/dropbox', 'app/drivers/storage/local'],
function (_, Dropbox, cfg, dropboxStorage, localStorage) {

    'use strict';

    var StorageDriver = function (recordName, callback) {

        if (!this instanceof StorageDriver) {
            return new StorageDriver(arguments);
        }

        var self = this;
        var dropbox = new Dropbox.Client({key : cfg['dropbox-api']});

        this.recordName = recordName;

        dropbox.authenticate({}, function authError(error) {

            // User didn't grant access or other error occurred
            // Fall back to localStorage
            if (error) {
                _.extend(StorageDriver.prototype, localStorage);

                callback(self);

                return;
            }

            _.extend(StorageDriver.prototype, dropboxStorage);

            try {
                self.setDropbox(dropbox, callback);
            } catch (ex) {
                console.error(ex);

                _.extend(StorageDriver.prototype, localStorage);

                callback(self);
            }
        });
    };

    _.extend(StorageDriver.prototype, {
        getItem: function (key) {
            return key;
        },
        setItem: function (key, value) {
            return true;
        }
    });

    return StorageDriver;
});