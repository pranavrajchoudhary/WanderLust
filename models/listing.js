const mongoose = require("mongoose");
const review = require("./review");
const { object } = require("joi");
const User = require("./user");

const schema = mongoose.Schema;

const listingSchema = new schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: String,
        image: {
            filename: {
                type: String,
                default: 'listingimage'
            },
            url: {
                type: String,
                default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7vlxc23whnpsnYqqppUQ0_dMGVfPsde6DHw&s',
                set: v => v === "" ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7vlxc23whnpsnYqqppUQ0_dMGVfPsde6DHw&s' : v
            }
        },

        price: {
            type: Number,
            min: 0,
        },
        location: String,
        country: String,
        reviews: [
            {
                type: schema.Types.ObjectId,
                ref: "review",
            }
        ],
        owner: {
            type: schema.Types.ObjectId,
            ref: "User",
        },
        geometry: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number], // [lng, lat]
                default: [0, 0]
            }
        }

    }
)


listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {

        await review.deleteMany({ _id: { $in: listing.reviews } });

    }

})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;