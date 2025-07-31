import mongoose from 'mongoose';
import env from 'dotenv';
import Category from '../models/categoryModel.js';

env.config();

const dbUrl = process.env.SPENDWISE_DB_URL;
mongoose.connect(dbUrl).then(() => console.log("Database is running"));

const categories = [
  // Income
  { name: "Salary", type: "income" },
  { name: "Freelance", type: "income" },
  { name: "Business", type: "income" },
  { name: "Investment Returns", type: "income" },
  { name: "Interest", type: "income" },
  { name: "Dividends", type: "income" },
  { name: "Rental Income", type: "income" },
  { name: "Gifts", type: "income" },
  { name: "Bonuses", type: "income" },
  { name: "Refunds", type: "income" },
  { name: "Pension", type: "income" },
  { name: "Royalties", type: "income" },
  { name: "Grants", type: "income" },
  { name: "Others", type: "income" },

  // Expense
  { name: "Rent", type: "expense" },
  { name: "Utilities", type: "expense" },
  { name: "Internet & Phone", type: "expense" },
  { name: "Groceries", type: "expense" },
  { name: "Transportation", type: "expense" },
  { name: "Fuel", type: "expense" },
  { name: "Dining Out", type: "expense" },
  { name: "Entertainment", type: "expense" },
  { name: "Subscriptions", type: "expense" },
  { name: "Health & Medical", type: "expense" },
  { name: "Insurance", type: "expense" },
  { name: "Education", type: "expense" },
  { name: "Clothing", type: "expense" },
  { name: "Donations", type: "expense" },
  { name: "Loans/Repayments", type: "expense" },
  { name: "Repairs", type: "expense" },
  { name: "Maintenance", type: "expense" },
  { name: "Travel", type: "expense" },
  { name: "Taxes", type: "expense" },
  { name: "Childcare", type: "expense" },
  { name: "Miscellaneous", type: "expense" }
];


const insertCategories = async () => {
  try {
    await Category.insertMany(categories);
    console.log("Categories inserted successfully!");
    mongoose.connection.close();
  } catch (err){
    console.log(err);
    mongoose.connection.close();
  }
}

// insertCategories();