module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		description: String,
		quantity: Number,
		supplier: String,
		price: Number,
		
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

		this.quantity = obj.quantity;

		this.supplier = obj.supplier;

		this.price = obj.price;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Propertymaterial = waw.mongoose.model("Propertymaterial", Schema));
};
