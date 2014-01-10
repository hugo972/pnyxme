
(function() { 
    
    var viewModel = {
    
        apps: ko.observableArray(),
        
        load: function () {
            
            viewModel.apps([
                {key: '111', name: 'app1'},
                {key: '333', name: 'app3'},
            ]);
        }
    };
    
    viewModel.load();
    ko.applyBindings(viewModel, $('#knyx')[0]);

})();