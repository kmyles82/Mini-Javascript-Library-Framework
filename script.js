var g = G$('Kerry', 'Myles');
//console.log(g);
//chainable
g.greet().setLang('es').greet(true).log();

$('#login').click(function(){
    let loginGrtr = G$('Kerry', 'Myles');
    
    $('#logindiv').hide();
    
    loginGrtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();
    
    
})
