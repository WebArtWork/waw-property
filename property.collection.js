module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		types: {
			type: [String],
			enum: [
				"For Sale",
				"Partial Sale",
				"Monthly Rent",
				"Daily Rent",
				"Auction Sale",
			],
		},
		name: String,
		description: String,
		address: String,
		type: String,
		buildingtype: String,
		area: Number,
		rooms: Number,
		floor: Number,
		renovation: String,
		appliances: String,
		utilities: String,
		nearby: String,
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

		this.types = obj.types;

		this.name = obj.name;

		this.description = obj.description;

		this.address = obj.address;

		this.type = obj.type;

		this.buildingtype = obj.buildingtype;

		this.area = obj.area;

		this.rooms = obj.rooms;

		this.floor = obj.floor;

		this.renovation = obj.renovation;

		this.appliances = obj.appliances;

		this.utilities = obj.utilities;

		this.nearby = obj.nearby;

		this.price = obj.price;

		this.trumb = obj.trumb;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Property = waw.mongoose.model("Property", Schema));
};
