//Safe code with IIFE
(function(global, $){
    
    //function that creates an new Object without having to use the "new" keyword
    let Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language); 
    }
    
    //is not accessible outside this environment
    let supportedLanguages = ['en', 'es'];
    
    let greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    let formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    
    
    let logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    }
    
    //Put properties and methods inside object returned from Greetr, will be exposed to outside environment
    Greetr.prototype = {
        
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function(){
            if(supportedLanguages.indexOf(this.language) === -1){
                throw 'Invalid language';
            }
        },
        
        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreetings: function(){
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        greet: function(formal){
            var msg;
            
            //if undefined or null it will be coerced to 'false'
            if(formal){
                msg = this.formalGreetings();
            } else {
                //message is !formal
                msg = this.greeting();
            }
            
            if(console){
                console.log(msg)
            }
            
            //'this' refers to the calling object at execution time
            //maske the method chainable
            return this;
        },
        
        log: function(){
            if(console){
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            //'this' refers to the calling object at execution time
            //maske the method chainable
            return this;
        },
        
        setLang: function(lang){
            this.language = lang;
            
            this.validate();
            
            //'this' refers to the calling object at execution time
            //maske the method chainable
            return this;
        }
        
    };      
    
    //Building object that will be returned by Greetr function
    Greetr.init = function(firstName, lastName, language){
        
        //self/this points to the empty object created by the "new" operator
        let self = this;
        
        //default properties
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
    }
 
    //Any new objects created from Greetr.init.prototype function constructor(line 15) will point to Greetr.prototype(line 10) as its prototype chain
    Greetr.init.prototype = Greetr.prototype;
    
    //Add Greetr to global Object and use $G as alias instead of typing out Greetr everytime
    global.Greetr = global.G$ = Greetr;
    
    
}(window, jQuery));