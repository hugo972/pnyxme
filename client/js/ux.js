
(function() { 

    ko.bindingHandlers.flyout = {
    
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

            $(element)
                .addClass('flyout')
                .hide();    
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

            var context = ko.utils.unwrapObservable(valueAccessor());
            if (context) {
                $(element).show();
            } else {
                $(element).hide();
            }
        }
    }
    
    ko.bindingHandlers.tabs = {
    
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
    
            var tabs = valueAccessor();
            var tabMap = {};
            var $element = $(element);
            
            var tabHeader = $('<ul>')
                .addClass('tab-header');
                
            var content = $('<div>');
            
            $.each(tabs, function (i, t) {
               
                tabMap[t.id] = t;
               
                t.element = $('<li>')
                    .text(t.title)
                    .click(function () { window.location.hash = t.id; })
                    .mouseover(function () { 
                        
                            if (!t.element.hasClass('active')) {
                                t.element.addClass('hover'); 
                            }
                        })
                    .mouseout(function () { t.element.removeClass('hover'); })
                    .appendTo(tabHeader);
            });
            
            window.onhashchange = function () {
                
                var tab = tabMap[window.location.hash.substring(1)];
                content.load(tab.view, function () { 
                    
                    $('<script>')
                        .attr('type', 'text/javascript')
                        .attr('src', tab.model)
                        .appendTo('head');
                });
                
                tabHeader
                    .find('li')
                    .removeClass('hover')
                    .removeClass('active');
                    
                tab.element.addClass('active');
            };
            
            $element
                .append(tabHeader)
                .append(content);
            
            // select the first element
            window.location.hash = tabs[0].id;
        }
    };

})();