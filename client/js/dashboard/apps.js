(function() { 
    
    var viewModel = {
    
        apps: ko.observableArray(),
        newapp: ko.observable(),
        
        add: function () {
            viewModel.newapp({
                name: ko.observable(),
                desc: ko.observable(),
                error: ko.observable()
            });
        },
        
        addEnd: function () {
            
            var newapp = viewModel.newapp();
            
            data.Apps.add({
                name: newapp.name(),
                desc: newapp.desc()

            }).done(function (data) {
                
                viewModel.newapp(null);
                viewModel.apps.push(data);
                
            }).fail(function (jqXHR, textStatus, errorThrown) {
                
                newapp.error(errorThrown);
            });
        },
        
        addCancel: function () {
            viewModel.newapp(null);
        },

        load: function () {
            
            viewModel.newapp(null);
            
            data.Apps.getAll().done(function (data) {
                
                viewModel.apps(data); 
            });
        }
    };
    
    viewModel.load();
    ko.applyBindings(viewModel, $('#apps')[0]);

})();