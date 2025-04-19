
require("dotenv").config();
const mongoose=require('mongoose');

const FoodItemSchema = new mongoose.Schema({}, { strict: false });
const FoodItem = mongoose.model('FoodItem', FoodItemSchema, 'food_items');
const dbUrl= process.env.MONGO_URI;
const mongoDB = async () => {
   
            try {
                await mongoose.connect(dbUrl);
                console.log("Connected to MongoDB");
        
                // Fetching food items
                const foodItems = await FoodItem.find({});
                const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
                
                global.food_items = foodItems;
                global.food_category = foodCategory;
                
            
            } 
        
     catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = mongoDB;