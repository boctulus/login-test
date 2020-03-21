
export default function protegeRutas(context) {
    //console.log('MIDDLEWARE !!!');
    //console.log(context.store.state.login.authUser.id);
    
    if (context.route.path == '/tres' && context.store.state.login.authUser.id == null) {
        //console.log('NO!');    
        context.store.commit('login/setAlert', 'Acceso no autorizado'); 
        context.redirect('/');
    } 
           
    
}