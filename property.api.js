module.exports = async (waw) => {
	const get = (addUser = false) => {
		return {
			query: (req) => {
				const query = addUser
					? {
							moderators: req.user._id,
					  }
					: {};

				if (req.query.job) {
					query.job = req.query.job;
				}
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
				if (req.query.propertyTypes) {
					query.propertyTypes = {
						$in: req.query.propertyTypes.split(","),
					};
				}
				if (req.query.rooms) {
					query.rooms = {
						$in: req.query.rooms.split(","),
					};
				}
				if (req.query.floors) {
					query.floors = {
						$in: req.query.floors.split(","),
					};
				}
				if (req.query.areas) {
					query.areas = {
						$in: req.query.areas.split(","),
					};
				}
				if (req.query.buildingTypes) {
					query.buildingTypes = {
						$in: req.query.buildingTypes.split(","),
					};
				}
				if (req.query.renovations) {
					query.renovations = {
						$in: req.query.renovations.split(","),
					};
				}
				if (req.query.appliances) {
					query.appliances = {
						$in: req.query.appliances.split(","),
					};
				}
				if (req.query.utilities) {
					query.utilities = {
						$in: req.query.utilities.split(","),
					};
				}
				if (req.query.nearbys) {
					query.nearbys = {
						$in: req.query.nearbys.split(","),
					};
				}
				if (req.query.prices) {
					query.prices = {
						$in: req.query.prices.split(","),
					};
				}
				if (req.query.pets) {
					query.pets = {
						$in: req.query.pets.split(","),
					};
				}
				if (req.query.sleepingPlaces) {
					query.sleepingPlaces = {
						$in: req.query.sleepingPlaces.split(","),
					};
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
		fetch: [
			{
				query: (req) => {
					return req.body.job
						? {
								author: req.user._id,
								job: req.body.job,
						  }
						: {
								author: req.user._id,
								_id: req.body._id,
						  };
				},
			},
			{
				name: "public",
				query: (req) => {
					return {
						_id: req.body._id,
					};
				},
			},
		],
	};
	waw.crud("property", crudConfig);
	waw.crud("propertyrecord", crudConfig);
	waw.crud("propertyjob", crudConfig);
	waw.crud("propertyjobproposal", crudConfig);
	waw.crud("propertytrade", crudConfig);
	waw.crud("propertytradeproposal", crudConfig);
	waw.crud("propertytask", crudConfig);
	waw.crud("propertyportfolio", crudConfig);

	const router = waw.router("/api/property");

	router.post("/details", waw.ensure, async (req, res) => {
		const job = await waw.Propertyjob.findOne({
			author: req.user._id,
			_id: req.body.job,
		});

		if (job) {
			const proposal = await waw.Propertyjobproposal.findOne({
				author: req.body.author,
				job: req.body.job,
			});

			if (proposal) {
				proposal.moreDetails = true;

				await proposal.save();

				res.json(true);
			} else {
				res.json(false);
			}
		} else {
			res.json(false);
		}
	});

	router.post("/assign", waw.ensure, async (req, res) => {
		const job = await waw.Propertyjob.findOne({
			author: req.user._id,
			_id: req.body.job,
		});

		if (job) {
			job.worker = req.body.author;

			job.start = req.body.start;

			job.deadline = req.body.deadline;

			await job.save();

			res.json(true);
		} else {
			res.json(false);
		}
	});
};
