
export default function protegeRutas(context) {
    //console.log('MIDDLEWARE !!!');
    //console.log(context.store.state.auth.authUser.id);

    // debería retornar una promesa
    context.store.commit('auth/REFRESH_TOKEN'); 

    if (context.route.path == '/tres' && context.store.state.auth.authUser.id == null) {
        //console.log('NO!');    
        context.store.commit('auth/SET_ALERT', 'Acceso no autorizado'); 
        context.redirect('/');
    } 
}