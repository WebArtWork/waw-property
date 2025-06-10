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
		propertyTypes: {
			type: [String],
			enum: [
				"Apartment",
				"House",
				"Office",
				"Penthouse",
				"Studio",
				"Loft",
				"Townhouse",
				"Duplex",
				"Commercial Space",
				"Retail Space",
				"Warehouse",
				"Cottage",
				"Mansion",
				"Room",
				"Dormitory",
			],
		},
		buildingTypes: {
			type: [String],
			enum: [
				"Tsar-era Building",
				"Stalinka",
				"Khrushchevka",
				"Czech-style",
				"Dormitory",
			],
		},
		areas: Number,
		rooms: {
			type: [String],
			enum: ["1 room", "2 rooms", "3+ rooms"],
		},
		floors: {
			type: [String],
			enum: [
				"1",
				"2",
				"3",
				"4",
				"5",
				"6",
				"7",
				"8",
				"9",
				"10",
				"11",
				"12",
				"13",
				"14",
				"15",
			],
		},
		renovations: {
			type: [String],
			enum: [
				"Euro Renovation",
				"Cosmetic Repair",
				"Emergency Condition",
				"Newly Built",
			],
		},
		appliances: {
			type: [String],
			enum: [
				"Furnished",
				"Unfurnished",
				"Electric Kettle",
				"Coffee Machine",
				"Hair Dryer",
				"Stove",
				"Oven",
				"Microwave",
				"Multicooker",
				"Air Conditioner",
				"Bathtub",
				"Shower Cabin",
				"Walk-in Closet",
				"Loggia",
				"Terrace",
			],
		},
		utilities: {
			type: [String],
			enum: [
				"Gas",
				"Electricity",
				"Central Water Supply",
				"Well",
				"Sewerage",
				"Garbage Disposal",
				"Elevator",
				"Internet",
			],
		},
		nearbys: {
			type: [String],
			enum: [
				"Kindergarten",
				"School",
				"Bus Stop",
				"Metro",
				"Market",
				"Store",
			],
		},
		sleepingPlaces: {
			type: [String],
			enum: ["1", "2", "3", "4", "5+"],
		},
		pets: {
			type: [String],
			enum: ["Allowed", "Not Allowed"],
		},
		minimumbidincrement: Number,
		auctionrules: String,
		auctiondate: Date,
		startingprice: Number,
		price: Number,
		pricePerDay: Number,
		pricePerMountly: Number,
		pricePerPartial: Number,
		thumb: String,

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

		this.propertyTypes = obj.propertyTypes;

		this.buildingTypes = obj.buildingTypes;

		this.areas = obj.areas;

		this.rooms = obj.rooms;

		this.floors = obj.floors;

		this.renovations = obj.renovations;

		this.appliances = obj.appliances;

		this.utilities = obj.utilities;

		this.nearbys = obj.nearbys;

		this.sleepingPlaces = obj.sleepingPlaces;

		this.pets = obj.pets;

		this.minimumbidincrement = obj.minimumbidincrement;

		this.auctionrules = obj.auctionrules;

		this.auctiondate = obj.auctiondate;

		this.startingprice = obj.startingprice;

		this.price = obj.price;

		this.pricePerDay = obj.pricePerDay;

		this.pricePerMountly = obj.pricePerMountly;

		this.pricePerPartial = obj.pricePerPartial;

		this.thumb = obj.thumb;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Property = waw.mongoose.model("Property", Schema));
};
