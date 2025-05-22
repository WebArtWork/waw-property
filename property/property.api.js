module.exports = async (waw) => {
	const get = (addUser = false) => {
		return {
			query: (req) => {
				const query = addUser
					? {
							moderators: req.user._id,
					  }
					: {};

				if (req.query.property) {
					query.property = req.query.property;
				}

				if (req.query.status) {
					query.status = req.query.status;
				}

				if (req.query.worker) {
					query.worker = req.query.worker;
				}

				if (req.query.types) {
					query.types = req.query.types;
				}

				return query;
			},
			sort: () => {
				return {
					_id: "-1",
				};
			},
		};
	};
	const crudConfig = {
		get: [
			{
				...get(true),
			},
			{ ...get(), name: "public" },
		],
	};
	waw.crud("property", crudConfig);
	waw.crud("propertyrecord", crudConfig);
	waw.crud("propertymaterial", crudConfig);
	waw.crud("propertyservice", crudConfig);
	waw.crud("propertyserviceproposal", crudConfig);
	waw.crud("propertytask", crudConfig);
	waw.crud("propertyworker", crudConfig);
	waw.crud("propertytrade", crudConfig);
	waw.crud("propertyportfolio", {
		get: {
			name: "public",
			query: (req) => {
				return {
					author: req.query.author,
				};
			},
		},
	});
};
