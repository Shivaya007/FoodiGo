const mongoose=require('mongoose');
const mongoURI = 'mongodb+srv://shivayagupta:123@cluster0.838ia.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';
const FoodItemSchema = new mongoose.Schema({}, { strict: false });
const FoodItem = mongoose.model('FoodItem', FoodItemSchema, 'food_items');

const mongoDB = async () => {
   
            try {
                await mongoose.connect(mongoURI);
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