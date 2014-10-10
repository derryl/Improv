
(function( globalName, root, factory ) {
    
    if ( typeof define === 'function' && define.amd ) {
        define( [], factory );
    }
    else if ( typeof exports === 'object' ) {
        module.exports = factory();
    }
    else{
        root[ globalName ] = factory();
    }
    
}('Improv', this, function() {
    
    'use strict';
    
    function define_Improv(){
        
        var Improv = {};

        var improv_defaults = {
            match:      "{{([^{}]*)}}",
            overwrite:  true
        };
        
        Improv.styleObject = null;

        function copy_object( object ){
            var copy = {};
            for( var key in object ){
                if( object.hasOwnProperty( key )){
                    copy[key] = object[key];
                }
            }
            return copy;
        };
        
        // AJAX wrapper for loading stylesheets
        Improv.loadFile = function( url, callback ) {
            
            var that = Improv.loadFile;
            
            that.bindFunction = function ( caller, object ) {
                return function() {
                    return caller.apply( object, [object] );
                };
            };

            that.stateChange = function ( object ) {
                if (that.request.readyState === 4) {
                    that.callback(that.request.responseText);
                }
            };

            that.createRequest = function() {
                if ( window.ActiveXObject ){
                    return new ActiveXObject('Microsoft.XMLHTTP');
                } else if ( window.XMLHttpRequest ) {
                    return new XMLHttpRequest();
                }
                return false;
            };

            that.url = url;
            that.callback = callback;
            that.request = that.createRequest();
            
            if ( that.request ) {
                var req = that.request;
                req.onreadystatechange = that.bindFunction( that.stateChange, that );
                req.open( "GET", url, true );
                req.send();
            }
        };
        
        
        Improv.interpolate = function( text, data ) {
            return text.replace(/{{([^{}]*)}}/g,
                function (a, b) {
                    var r = data[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        }
        
        
        Improv.appendStylesheet = function( styles ) {
            
            var that = this;
            
            var import_options = copy_object( improv_defaults );
            
            if (!styles) return false;
            
            if (that.styleObject) {
                console.log('removed old stylesheet');
                that.styleObject.parentNode.removeChild( that.styleObject );
            }
            
            var ss = document.createElement('style'),
                
                content = document.createTextNode( styles );
                ss.appendChild(content);
                
            that.styleObject = ss;
            
            document.getElementsByTagName('head')[0].appendChild(ss);
        }
        
        
        Improv.add = function( url, data ) {
            Improv.loadFile( url, function(resp) {
                Improv.appendStylesheet( Improv.interpolate( resp, data ) );
            })
        }
        

        //accepts options object returns list or single color
        function make_color( options ) {
            var color = [],
            //clone base please options
                color_options = copy_object( improv_defaults ),
                base_color = null;

            if( options !== null ){
            //override base Improv options
                for( var key in options ){
                    if( options.hasOwnProperty( key )){
                        color_options[key] = options[key];
                    }
                }
            }
        };

        return Improv;
    }
    return define_Improv();
}));