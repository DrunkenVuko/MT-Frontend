module.exports = [
    'StorageUsers', 'CommonRequest',
    function(
        StorageUsers, CommonRequest
    ) {
        'use strict';
        var self = this;

        self.details = {};

        CommonRequest.articles.get({}, function(response) {
            if (response && response.message) {
                self.list = response.message;
            }
        });

        self.getById = function (theDesiredArticleId) {

            CommonRequest.articles.getArticleById({
                articleId : theDesiredArticleId
            }, function(response) {
                console.log('response', response.message);

                self.details[theDesiredArticleId] = 'Siehe Consolen-Ausgabe...';

            }, function(response) {
                console.log('error', response);
            });
        };
    }];
