module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		units: [
			{
				name: String,
				type: String,
				use: Number,
				price: Number,
			},
		],
		price: Number,
		workdays: Number,
		deadline: Date,
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

	Schema.methods.create = function (obj, user, waw) {
		this.author = user._id;

		this.moderators = [user._id];

		this.units = obj.units;

		this.price = obj.price;

		this.workdays = obj.workdays;

		this.deadline = obj.deadline;
	};
	return (waw.Propertyserviceproposal = waw.mongoose.model(
		"Propertyserviceproposal",
		Schema
	));
};
