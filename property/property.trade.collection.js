module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		description: String,
		type: String,
		price: Number,
		contacts: String,
		comments: String,
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

		this.type = obj.type;

		this.price = obj.price;

		this.contacts = obj.contacts;

		this.comments = obj.comments;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Propertytrade = waw.mongoose.model("Propertytrade", Schema));
};
