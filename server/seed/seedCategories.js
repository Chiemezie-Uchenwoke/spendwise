import Category from "../models/categoryModel.js";

export const seedCategories = [
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

  // Expense - Existing
  { name: "Rent", type: "expense" },
  { name: "Utilities", type: "expense" },
  { name: "Internet & Phone", type: "expense" },
  { name: "Groceries", type: "expense" },
  { name: "Transportation", type: "expense" },
  { name: "Fuel", type: "expense" },
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
  { name: "Car Wash", type: "expense" },

  // Expense - Food & Dining
  { name: "Breakfast", type: "expense" },
  { name: "Lunch", type: "expense" },
  { name: "Dinner", type: "expense" },
  { name: "Snacks", type: "expense" },
  { name: "Coffee", type: "expense" },

  // Expense - Work & Business
  { name: "Work Tools", type: "expense" },
  { name: "Co-working Space", type: "expense" },

  // Expense - Shopping / Other
  { name: "Electronics", type: "expense" },
  { name: "Personal Care", type: "expense" },
  { name: "Beauty / Salon", type: "expense" },
  { name: "Others", type: "expense" },
];

export const insertSeedCategories = async () => {
  const count = await Category.countDocuments();
  if (count === 0) {
    await Category.insertMany(seedCategories);
    console.log("Categories seeded successfully!");
  } else {
    console.log("Categories already exist. Skipping seeding.");
  }
};
