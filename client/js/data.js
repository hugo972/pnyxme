
(function() { 

    window.data = {
        
        Apps: {
            
            getAll: function() {
                
                return $.getJSON('app/userApps');
            },
            
            add: function(app) {
                
                return $.post('app/add', app);
            }
        },
        
        Devices: {
            
            getAll: function() {
                
                return $.getJSON('user/devices');
            }
        }
    };

})();