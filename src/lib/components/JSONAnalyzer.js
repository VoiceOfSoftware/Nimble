export const analyzeJSON = (json) => {
	debugger
	// Helper to calculate a "meaning score" for an array
	const calculateArrayScore = (arr, path) => {
		if (!Array.isArray(arr) || arr.length === 0) return { score: 0, path };

		let score = 0;
		let fieldCount = 0;
		let identifierCount = 0;
		let types = new Set();

		// Factor 1: Length of array with diminishing returns
		score += Math.min(arr.length * 2, 20); // Cap at 20 points

		// Factor 2: Consistency of structure
		if (arr.every(item => typeof item === typeof arr[0])) {
			score += 15;

			if (typeof arr[0] === 'object' && arr[0] !== null) {
				const firstKeys = Object.keys(arr[0]).sort().join(',');
				const structureMatch = arr.filter(item =>
					item && Object.keys(item).sort().join(',') === firstKeys
				).length;

				score += (structureMatch / arr.length) * 25;

				// Factor 3: Rich object structure with field quality assessment
				const fields = Object.keys(arr[0] || {});
				fieldCount = fields.length;
				score += Math.min(fieldCount * 2, 30); // Increased cap for rich structures

				// Factor 4: Strong identifier presence
				const identifierPatterns = [
					/^(id|key|code)$/i,                    // Basic IDs
					/^.*?(id|key|code)$/i,                 // Suffixed IDs
					/^(name|title|label|caption)$/i,       // Name fields
					/^(filename|path|url)$/i,              // File/resource identifiers
					/^(date|time|timestamp|created|updated)$/i // Time-based identifiers
				];

				identifierCount = fields.filter(field =>
					identifierPatterns.some(pattern => pattern.test(field))
				).length;

				score += identifierCount * 5; // More points for multiple identifiers

				// Factor 5: Data type variety (more diverse = more likely to be meaningful)
				types = new Set(fields.map(field => typeof arr[0][field]));
				score += types.size * 5;

				// Factor 6: Meaningful field names (domain-specific)
				const meaningfulFields = [
					'category', 'type', 'status', 'description', 'comments',
					'price', 'cost', 'amount', 'quantity', 'size',
					'width', 'height', 'depth', 'weight', 'dimensions',
					'user', 'author', 'owner', 'creator', 'member',
					'group', 'department', 'organization', 'company',
					'location', 'address', 'city', 'country', 'region'
				];

				const meaningfulFieldCount = fields.filter(field =>
					meaningfulFields.some(mf => field.toLowerCase().includes(mf.toLowerCase()))
				).length;

				score += meaningfulFieldCount * 3;
			}
		}

		// Factor 7: Position in hierarchy (root arrays often important)
		score += (path === '') ? 15 : (path.split('.').length === 1) ? 10 : 0;

		// Factor 8: Content quality
		const hasNonEmptyValues = arr.some(item => {
			if (typeof item === 'object' && item !== null) {
				return Object.values(item).some(v =>
					v !== null && v !== undefined && v !== '' &&
					!(Array.isArray(v) && v.length === 0)
				);
			}
			return true;
		});

		if (hasNonEmptyValues) score += 10;

		return {
			score,
			path,
			details: {
				structureQuality: Math.min(fieldCount * 2, 30) / 30,
				identifierStrength: fieldCount > 0 ? (identifierCount * 5) / (fieldCount * 5) : 0,
				dataTypeVariety: types.size / 4, // Normalized to common type count
				contentQuality: hasNonEmptyValues ? 1 : 0
			}
		};
	};

	// Rest of the code remains the same...
	const findArrays = (obj, path = '') => {
		let arrays = [];

		if (Array.isArray(obj)) {
			arrays.push({ array: obj, path });

			// Also check for nested arrays
			obj.forEach((item, index) => {
				arrays = arrays.concat(findArrays(item, `${path}[${index}]`));
			});
		} else if (obj && typeof obj === 'object') {
			Object.entries(obj).forEach(([key, value]) => {
				const newPath = path ? `${path}.${key}` : key;
				arrays = arrays.concat(findArrays(value, newPath));
			});
		}

		return arrays;
	};

	// Main analysis function
	const analyze = (data) => {
		const arrays = findArrays(data);
		const scoredArrays = arrays.map(({ array, path }) => ({
			...calculateArrayScore(array, path),
			array,
			sampleData: array[0],
			itemCount: array.length,
			structureConsistency: array.every(item =>
				typeof item === typeof array[0] &&
				(!item || Object.keys(item).length === Object.keys(array[0] || {}).length)
			)
		}));

		scoredArrays.sort((a, b) => b.score - a.score);

		const mostMeaningful = scoredArrays.length > 0 ? scoredArrays[0] : null;

		let arrayAnalysis = null;
		if (mostMeaningful) {
			const { array, path, score, details, sampleData } = mostMeaningful;
			arrayAnalysis = {
				path,
				confidence: Math.min(score / 100, 1),
				qualityMetrics: details,
				length: array.length,
				sample: sampleData,
				schema: typeof sampleData === 'object' ? Object.entries(sampleData).reduce((acc, [key, value]) => {
					acc[key] = {
						type: typeof value,
						nullable: array.some(item => item[key] === null),
						hasEmptyValues: array.some(item => item[key] === '')
					};
					return acc;
				}, {}) : typeof sampleData,
				uniqueValueCount: new Set(array.map(JSON.stringify)).size
			};
		}

		return {
			meaningfulArray: arrayAnalysis,
			allArrays: scoredArrays.map(({ path, score, details, itemCount, structureConsistency }) => ({
				path,
				confidence: Math.min(score / 100, 1),
				qualityMetrics: details,
				itemCount,
				structureConsistency
			}))
		};
	};

	return analyze(json);
}

export function translateAnalyzedSchemaToNimbleSchema(analyzedSchema) {
	let nimbleSchema = [];
	Object.keys(analyzedSchema).forEach((element) => {
		nimbleSchema.push({
			visible: true,
			column: element,
			type: analyzedSchema[element].type,
			label: element,
			resizable: true,
			editable: true,
			filter: true
		});
	});
	return nimbleSchema;
}


//===============
//	find all unique data providers in a layout structure
//===============

export function findUniqueDataProviders(obj) {
	// Set to store unique dataProviderNames
	const providers = new Set();

	// Helper function to recursively traverse the object
	function traverse(node) {
		// Base case: if node is null or not an object
		if (!node || typeof node !== 'object') {
			return;
		}

		// Check if current node has dataProviderName
		if (node.hasOwnProperty('dataProviderName')) {
			providers.add(node.dataProviderName);
		}

		// Recursively check all properties
		for (const key in node) {
			// Handle both array and object children
			if (Array.isArray(node[key])) {
				node[key].forEach(item => traverse(item));
			} else if (typeof node[key] === 'object') {
				traverse(node[key]);
			}
		}
	}

	// Start traversal with the root object
	traverse(obj);

	// Convert Set to Array and return
	return Array.from(providers);
}
