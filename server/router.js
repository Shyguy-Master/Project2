const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getChat', mid.requiresLogin, controllers.Chat.getChat);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/getDonate', mid.requiresLogin, controllers.Account.getDonate);
  app.post('/donate', mid.requiresLogin, controllers.Account.donate);
  app.post('/resetDonate', mid.requiresLogin, controllers.Account.resetDonate);

  app.get('/chat', mid.requiresLogin, controllers.Chat.hostIndex);
  app.post('/saveChat', mid.requiresLogin, controllers.Chat.saveChat);

  app.post('/uploadFile', mid.requiresLogin, controllers.File.uploadFile);
  app.get('/retrieveFile', mid.requiresLogin, controllers.File.retrieveFile);

  app.delete('/clearChat', mid.requiresLogin, controllers.Chat.deleteAllChats);
  app.delete('/clearMessages', mid.requiresLogin, controllers.Chat.deleteMyChats);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
