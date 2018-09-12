//Safe code with IIFE
(function(global, $){
    
    //function that creates an new Object without having to use the "new" keyword
    let Greetr = function(firstName, lastName, language){
        //'new' an object
        return new Greetr.init(firstName, lastName, language); 
    }
    
    //is not accessible outside this environment, hidden within scope of the IIFE
    let supportedLanguages = ['en', 'es'];
    
    //informal greeting
    let greetings = {
        en: 'Hello',
        es: 'Hola'
    };
    
    //formal greeting
    let formalGreetings = {
        en: 'Greetings',
        es: 'Saludos'
    };
    
    //logger messages
    let logMessages = {
        en: 'Logged in',
        es: 'Inicio sesion'
    }
    
    //Holds properties and methods inside object returned from Greetr, will be exposed to outside environment
    Greetr.prototype = {
        
        
        //'this' refers to the calling object at execution time
        fullName: function(){
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function(){
            //check that is a valid language
            //references the externally inaccesible 'supportedLanguages' within the closure
            if(supportedLanguages.indexOf(this.language) === -1){
                throw 'Invalid language';
            }
        },
        
        //retrieve messages from object by referring to properties using [] syntax
        greeting: function(){
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        formalGreetings: function(){
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        greet: function(formal){
            var msg;
            
            
            if(formal){
                msg = this.formalGreetings();
            } else {
                //if undefined or null it will be coerced to 'false'
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
            //set the language
            this.language = lang;
            
            //validate
            this.validate();
            
            //'this' refers to the calling object at execution time
            //maske the method chainable
            return this;
        },
        
        //accepts any selector/string and create a jQuery object from it
        HTMLGreeting: function(selector, formal){
            if(!$){
                throw 'jQuery not loaded';
            }
            
            if(!selector){
                throw 'Missing jQuery selector';
            }
            
            //determine the message
            var msg;
            
            if(formal){
                msg = this.formalGreetings();
            } else {
                //if undefined or null it will be coerced to 'false'
                msg = this.greeting();
            }
            
            //use jQuery, injects the message in the chosen place in the DOM
            $(selector).html(msg);
            
            //'this' refers to the calling object at execution time
            //maske the method chainable
            return this;
        }
        
    };      
    
    //Building the actual object here, allowing the use of the 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language){
        
        //self/this points to the empty object created by the "new" operator
        let self = this;
        
        //default properties
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
        self.validate();
        
    }
 
    //Trick borrowed from jQuery. Any new objects created from Greetr.init.prototype function constructor(line 15) will point to Greetr.prototype(line 10) as its prototype chain
    Greetr.init.prototype = Greetr.prototype;
    
    //attached Greetr to global Object and use $G as alias instead of typing out Greetr everytime
    global.Greetr = global.G$ = Greetr;
    
    
}(window, jQuery));