const app= require('./app');

app.listen(app.get('port'), () => {
    console.log('corriendo en puerto', app.get("port"));
})