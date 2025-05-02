module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		description: String,
		service: String,
		price: Number,
		contact: String,
		url: { type: String, sparse: true, trim: true, unique: true },
		data: {},
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

		this.name = obj.name;

		this.description = obj.description;

		this.service = obj.service;

		this.price = obj.price;

		this.contact = obj.contact;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Propertyservice = waw.mongoose.model("Propertyservice", Schema));
};
