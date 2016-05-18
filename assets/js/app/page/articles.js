module.exports = [
    'CommonRequest',
    function(
        CommonRequest
    ) {
        'use strict';
        var self = this;

        self.details = {};

        // CommonRequest.articles.getAll({'x-access-token' : getCookie('token')}, {}, function(response) {
        //     if (response && response.message) {
        //         self.list = response.message;
        //         console.log('articles.getAll wird ausgeführt');
        //     }
        // });
        CommonRequest.articles.getAll({}, {}, function(response) {
            if (response && response.message) {
                console.log(response.messages);
                self.list = response.message;
                console.log('articles.getAll wird ausgeführt');
            }
        });
        // CommonRequest.articles.getArticleById({'x-access-token' : getCookie('token'), articleId : getCookie('tempArticleID')}, {}, function(response) {
        //     if (response && response.message) {
        //         console.log('article.getArticleById wird ausgeführt');
        //         self.tempArticle = response.message;
        //     }
        // });
        self.updateArticle = function() {
            CommonRequest.users.changeProfile({
                articleId : getCookie('tempArticleID')
            },  {
                "x-access-token": getCookie('token'),
                "name": self.tempArticle.name,
                "price": self.tempArticle.price,
                "allergics": self.tempArticle.allergics,
                "img": self.tempArticle.img,
                "group": self.tempArticle.group
            }, function(response) {
                console.log('error', response);
            });
        };
        self.add = function() {
            CommonRequest.users.addArticle({

            }, {
                "name": self.newArticle.name,
                "price": self.newArticle.price,
                "allergics": self.newArticle.allergics,
                "img": self.newArticle.img,
                "group": self.newArticle.group
            }, function(response) {
                console.log('error', response);
            });
        };
        self.getAll = function () {
            CommonRequest.articles.getAll({
                'x-access-token' : getCookie('token')

            },  {}, function(response) {
                if (response && response.message) {
                    self.list = response.message;
                    console.log('self.articles.getAll wird ausgeführt');
                }
            }, function(response) {
                console.log('error', response);
            });
        };
        self.goToAdd = function() {
            document.location.href = ('/articles/add');
        };

        self.getById = function (articleID) {
            CommonRequest.articles.getArticleById({
                'x-access-token' : getCookie('token'), articleId : articleID

            },  {}, function(response) {
                self.tempArticle = response.message;
                console.log('article.getArticleById wird ausgeführt');
                document.cookie = 'tempArticleID=' + response.message._id;
                document.location.href = ('/articles/' + response.message._id);
            }, function(response) {
                console.log('error', response);
            });
        };
    }];


function getCookie(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length,c.length);
        }
    }
    return '';
}
function delCookie(cname) {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}