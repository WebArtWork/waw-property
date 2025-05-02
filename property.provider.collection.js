module.exports = async function (waw) {
	const Schema = waw.mongoose.Schema({
		companyname: String,
		contacts: String,
		name: String,
		description: String,
		servicetype: String,
		experience: Number,
		rating: Number,
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

		this.companyname = obj.companyname;

		this.contacts = obj.contacts;

		this.name = obj.name;

		this.description = obj.description;

		this.servicetype = obj.servicetype;
		
		this.experience = obj.experience;

		this.rating = obj.rating;

		this.data = obj.data;

		this.url = obj.url;
	};
	return (waw.Propertyprovider = waw.mongoose.model("Propertyprovider", Schema));
};
