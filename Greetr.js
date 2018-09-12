//Safe code with IIFE
(function(global, $){
    
    //function that creates an new Object without having to use the "new" keyword
    let Greetr = function(firstName, lastName, language){
        return new Greetr.init(firstName, lastName, language); 
    }
    
    //Use properties and methods inside object returned from Greetr
    Greetr.prototype = {};      
    
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