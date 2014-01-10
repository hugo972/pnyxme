
(function() { 
    
    var viewModel = {
    
        devices: ko.observableArray(),
        
        load: function () {
            
            data.Devices.getAll().done(function (data) {
                
                viewModel.devices(data); 
            });
        }
    };
    
    viewModel.load();
    ko.applyBindings(viewModel, $('#devices')[0]);

})();