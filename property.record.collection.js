module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		property: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		type: {
			type: String,
			enum: [
				"Utility bill",
				"Rent bill",
				"Incident",
				"Job",
				"Change owner",
			],
		},

		price: Number,
		materials: [String],
		photos: [String],
		service: String,
		incident: String,
		rent: String,

		url: { type: String, sparse: true, trim: true, unique: true },
		data: {},
		author: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		seller: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Seller",
		},
		buyer: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "Buyer",
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
		this.property = obj.property;

		this.type = obj.type;

		// delete below

		this.author = user._id;

		this.seller = user._id;

		this.buyer = user._id;

		this.moderators = [user._id];

		//this.name = obj.name;
		//this.description = obj.description;
		//this.responsible = obj.responsible;
		//this.comments = obj.comments;

		this.price = obj.price;

		this.materials = obj.materials;

		this.photos = obj.photos;

		this.service = obj.service;

		this.incident = obj.incident;

		this.rent = obj.rent;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Propertyrecord = waw.mongoose.model("Propertyrecord", Schema));
};
