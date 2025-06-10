module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		description: String,
		services: [
			{
				id: Number,
			},
		],
		materials: [
			{
				id: Number,
			},
		],
		status: {
			type: String,
			enum: ["New", "Assigned", "Invoiced", "Paid", "Completed"],
			default: "New",
		},
		units: [
			{
				name: String,
				type: String,
				quantity: Number,
				price: Number,
			},
		],
		price: Number,
		worker: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		contact: {
			name: String,
			phone: String,
			email: String,
		},
		agreed: Date,
		start: Date,
		expected: Date,
		deadline: Date,
		property: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Property",
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

	Schema.methods.create = function (obj, user, waw) {
		this.author = user._id;

		this.moderators = [user._id];

		this.property = obj.property;

		this.name = obj.name;

		this.description = obj.description;

		this.services = obj.services;

		this.materials = obj.materials;

		this.deadline = obj.deadline;

		this.price = obj.price;

		this.units = obj.units;

		this.contact = obj.contact;
	};
	return (waw.Propertyjob = waw.mongoose.model("Propertyjob", Schema));
};
