module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		name: String,
		type: {
			type: String,
			enum: ['sell / buy payment', 'service', 'materials', 'rent payment', 'incident']
		},
		description: String,
		responsible: String,
		expenses: Number,
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

		this.type = obj.type;

		this.description = obj.description;

		this.responsible = obj.responsible;

		this.expenses = obj.expenses;

		this.comments = obj.comments;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Propertyrecord = waw.mongoose.model("Propertyrecord", Schema));
};
