const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  //app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);//Remove 

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  //app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);//Remove 
  //app.post('/maker', mid.requiresLogin, controllers.Domo.makeDomo);//Remove 

  //app.delete('/deleteDomo', mid.requiresLogin, controllers.Domo.deleteDomo);//Remove 

  app.get('/chat', mid.requiresLogin, controllers.Chat.hostIndex);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
