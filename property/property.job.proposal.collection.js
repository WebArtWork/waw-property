module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		description: String,
		units: [
			{
				name: {
					type: String,
				},
				type: {
					type: String,
				},
				quantity: {
					type: Number,
				},
				price: {
					type: Number,
				},
			},
		],
		price: Number,
		workdays: Number,
		moreDetails: {
			type: Boolean,
			default: false,
		},
		start: Date,
		deadline: Date,
		job: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Propertyjob",
		},
		author: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		moderators: [
			{
				type: waw.mongoose.Schema.Types.ObjectId,
				sparse: true,
				ref: "User",
			},
		],
	});

	Schema.methods.create = function (obj, user) {
		this.job = obj.job;

		this.author = user._id;

		this.moderators = [user._id];

		this.description = obj.description;

		this.units = obj.units;

		this.price = obj.price;

		this.workdays = obj.workdays;

		this.start = obj.start;

		this.deadline = obj.deadline;
	};
	return (waw.Propertyjobproposal = waw.mongoose.model(
		"Propertyjobproposal",
		Schema
	));
};
