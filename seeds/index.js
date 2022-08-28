const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console.error,'connection error:'));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async() => {
    await Campground.deleteMany({});
    const price = Math.floor(Math.random() * 20) + 10;
    for(let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const city = sample(cities);
        const coordinates = [city.longitude, city.latitude];
        const camp  = new Campground({
            author: '62d84e0509a7cd3f483ec035',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${city.city}, ${city.state}`,
            geometry: {
                type: 'Point',
                coordinates: coordinates,
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/du6ttebo3/image/upload/v1659719315/YelpCamp/psycygunwedk1i9qf1vk.jpg',
                  filename: 'YelpCamp/psycygunwedk1i9qf1vk',
                },
                {
                  url: 'https://res.cloudinary.com/du6ttebo3/image/upload/v1659719317/YelpCamp/jwyec7ujlsws50pt829k.jpg',
                  filename: 'YelpCamp/jwyec7ujlsws50pt829k',
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, fuga sunt? Minus quasi sunt eius itaque cum, a omnis hic porro amet quaerat necessitatibus inventore dolorem facilis officia expedita laboriosam! Excepturi cum voluptates eius corporis neque unde dolor illo esse dolores eveniet mollitia molestias non earum quae facilis nihil praesentium ut, voluptatem dignissimos? Ut nam quibusdam sit. Quo, suscipit nisi. Nobis porro nostrum nam cum! Atque, minus repudiandae, minima, amet nostrum iste eligendi officiis labore possimus libero totam. Deleniti provident voluptates praesentium distinctio ut quibusdam sunt ad accusantium iure facilis.',
            price
        });
        await camp.save();
    }
}

seedDB().then(()=>{
    mongoose.connection.close();
})