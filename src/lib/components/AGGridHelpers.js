export function createColumnsFromFirstRow(rows) {
	if (!rows || !rows[0]) {
		return [];
	}
	let columnDefs = [];

	Object.keys(rows[0]).forEach((element) => {
		columnDefs.push({
			field: element,
			sortable: true,
			resizable: true,
			editable: true,
			filter: true
		});
	});
	return columnDefs;
}

function jsonCellRenderer(params) {
	if (typeof params.value === 'string') {
		try {
			const jsonObj = JSON.parse(params.value);
			return JSON.stringify(jsonObj, null, 2);
		} catch (e) {
			return params.value;
		}
	}
	return params.value;
}

//	Map data_provider table's Schema field definition to AGGrid cell formatter
export function createColumnsFromSchema(schema) {
	let columnDefs = [];

	schema.forEach((element) => {
		if (element.visible) {
			switch (element.type) {
				case 'date_time_utc':
					columnDefs.push({
						field: element.column,
						headerName: element.label,
						cellDataType: 'date',
						valueFormatter: params => {
							if (params.value) {
								return new Date(params.value).toUTCString();
							}
							return '';
						},
						sortable: true,
						resizable: true,
						editable: true,
						filter: true
					})
					break
				case 'string':
				case 'script':
				case 'email':
					columnDefs.push({
						field: element.column,
						headerName: element.label,
						maxWidth: 500,
						sortable: true,
						resizable: true,
						editable: true,
						filter: true
					})
					break
				case 'reference':
					columnDefs.push({
						field: element.column,
						headerName: element.label,
						sortable: true,
						resizable: true,
						editable: true,
						filter: true
					})
					break
				case 'integer':
					columnDefs.push({
						field: element.column,
						headerName: element.label,
						cellDataType: 'number',
						valueFormatter: params => {
							Math.floor(params.value)
						},
						sortable: true,
						resizable: true,
						editable: true,
						filter: true
					})
					break
				case 'number':
					columnDefs.push({
						field: element.column,
						headerName: element.label,
						cellDataType: 'number',
						sortable: true,
						resizable: true,
						editable: true,
						filter: true
					})
					break
				case 'boolean':
					columnDefs.push({
						field: element.column,
						headerName: element.label,
						cellDataType: 'boolean',
						sortable: true,
						resizable: true,
						editable: true,
						filter: true
					})
					break
				case 'JSON':
					columnDefs.push({
						field: element.column,
						headerName: element.label,
						cellDataType: 'object',
						cellRenderer: jsonCellRenderer,
						cellStyle: { 'white-space': 'pre-wrap' },
						sortable: true,
						resizable: true,
						editable: true,
						filter: true
					})
					break
				default:
					columnDefs.push({
						field: element.column,
						headerName: element.label,
						sortable: true,
						resizable: true,
						editable: true,
						filter: true
					})
					break
			}
		}

	});
	return columnDefs;
}