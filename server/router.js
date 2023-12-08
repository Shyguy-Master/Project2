const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  // app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);//Remove
  app.get('/getChat', mid.requiresLogin, controllers.Chat.getChat);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  // app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);//Remove
  app.get('/chat', mid.requiresLogin, controllers.Chat.hostIndex);
  // app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo);//Remove
  app.post('/saveChat', mid.requiresLogin, controllers.Chat.saveChat);

  // app.delete('/deleteDomo', mid.requiresLogin, controllers.Domo.deleteDomo);//Remove
  app.delete('/clearChat', mid.requiresLogin, controllers.Chat.deleteAllChats);
  app.delete('/clearMessages', mid.requiresLogin, controllers.Chat.deleteMyChats);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
