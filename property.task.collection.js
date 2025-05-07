module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		category: {
			type: String,
			enum: ["Repair", "Inspection", "Cleaning", "Maintenance"]
		},
		description: String,
		deadline: String,
		address: String,
		latitude: Number,
		longitude: Number, 
		startTime: Number,
		endTime: Number,
		
		url: { type: String, sparse: true, trim: true, unique: true },
		data: {},
		author: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		createdBy: {
			type: waw.mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		assigned: {
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

		this.createdBy = user._id;

		this.assigned = user._id;

		this.moderators = [user._id];

		this.name = obj.name;

		this.description = obj.description;

		this.assigned = obj.assigned;
		
		this.deadline = obj.deadline;
		
		this.address = obj.address;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Propertytask = waw.mongoose.model("Propertytask", Schema));
};
