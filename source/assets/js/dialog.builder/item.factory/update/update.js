
// @codekit-append "get.values.js";
// @codekit-append "set.values.js";

item.update = {};
item.update.style = {};

item.update.style.localStorage = function( prop, data ) {
	
	var val = item.update.get_values( prop );
	data.items[ 'item-' + data.activeId ].style[ prop ] = val[ prop ];
	local_storage.set('dialog', data );
	return data; // Changed data is force fed to the two functions below
	
};

item.update.style.treeView = function( prop, data, dataItem ) {
	
	if ( prop === 'text' || prop === 'all' ) {
		var text   = dataItem.style.text;
		var textItem = $('#panel-tree-view-wrap [data-item-id="'+ dataItem.id +'"] > .item-text');
		textItem.html( processItemName( text, dataItem.type ) );
	}
	
};

item.update.style.dialogPreview = function( prop, data, dataItem ) {
	
	var params = {
		property: prop,
		value: dataItem.style[ prop ],
		data: data,
		dataItem: dataItem
	};
	
	// prop: 'all' is used when items are first created. After that the properties are edited individually.
	if ( prop === 'all' ) {
		$.each( dataItem.style, function(key, val) {
			params.property = key;
			params.value = val;
			item.update.set_values( params );
		});
	}
	else {
		item.update.set_values( params );
	}
	
};


item.update.order = function() {
	
	// Read old data from local storage....
	var data = local_storage.get('dialog');
	// Update order by re-recoding the id's of every single item currently in the tree view
	data.order = item.get.order();
	// Write back to local storage...
	local_storage.set('dialog', data );
	
};
