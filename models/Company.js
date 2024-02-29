const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim:true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address:{
        type: String,
        required: [true, 'Please add an address'],
    },
    website:{
        type: String,
        required: [true, 'Please add a website'],
    },
    description:{
        type: String, 
        required: [true, 'Please add a description']
    },
    postalcode:{
        type: String,
        required: [true, 'Please add a postalcode'], 
        maxlength: [5, 'Postal Code can not be more than5 digits'],
    },
    tel: {
        type: String,
        required: [true, 'Please add telephone number']
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//Cascade delete booking when a company is deleted
CompanySchema.pre('deleteOne', {document: true, query: false}, async function (next) {
    console.log(`Booking being removed from company ${this._id}`);
    await this.model(`Booking`).deleteMany({company: this._id});
    next();
});

//Reverse populate with virtuals
CompanySchema.virtual('bookings',{
    ref: 'Booking',
    localField: '_id',
    foreignField: 'company',
    justOne: false
});

module.exports=mongoose.model('Company',CompanySchema);
