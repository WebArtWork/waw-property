module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		description: String,
		paid: Number,
		status: {
			type: String,
			enum: ["New", "Paid", "Cancelled"],
			default: "New",
		},
		author: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		job: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Propertyjob",
		},
	});

	Schema.methods.create = function (obj, user, waw) {
		this.job = obj.job;

		this.paid = obj.paid;

		this.description = obj.description;

		this.author = user._id;
	};
	return (waw.Propertyinvoice = waw.mongoose.model(
		"Propertyinvoice",
		Schema
	));
};
