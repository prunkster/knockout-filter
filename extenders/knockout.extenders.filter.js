ko.extenders.filter = function (target, options) {
	return ko.computed(function () {
		options = ko.utils.extend({ ignoreMissingProperties: false, filters: [] }, options);
		
		var allItems = ko.unwrap(target),
			matchingItems = allItems;
						
		for (var i = 0; i < allItems.length; i++) {
			for (var j = 0; j < options.filters.length; j++) {
				var filter = options.filters[j];
				var expected = filter.filtProp;
				
				if (expected) {
					expected = ko.unwrap(expected);
					
					if (typeof expected !== 'undefined') {
						matchingItems = ko.utils.arrayFilter(matchingItems, function (item) {
							var itemProp = item[filter.elemProp];
							
							if (!itemProp) {
								return ko.unwrap(options.ignoreMissingProperties);
							}
								
							itemProp = ko.unwrap(itemProp);
							return itemProp === expected;
						});
					}
				}
			}
		}
		
		return matchingItems;
	}, target);
};