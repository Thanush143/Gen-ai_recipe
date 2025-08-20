export interface Ingredient {
  name: string
  category: string
  emoji: string
  popular?: boolean
  aliases?: string[]
}

export const INGREDIENT_LIST: Ingredient[] = [
  // Proteins
  { name: "Chicken Breast", category: "Proteins", emoji: "🐔", popular: true, aliases: ["chicken", "breast"] },
  { name: "Ground Beef", category: "Proteins", emoji: "🥩", popular: true, aliases: ["beef", "mince"] },
  { name: "Salmon", category: "Proteins", emoji: "🐟", popular: true, aliases: ["fish"] },
  { name: "Eggs", category: "Proteins", emoji: "🥚", popular: true, aliases: ["egg"] },
  { name: "Tofu", category: "Proteins", emoji: "🧈", popular: true, aliases: ["soy"] },
  { name: "Shrimp", category: "Proteins", emoji: "🦐", aliases: ["prawns"] },
  { name: "Pork", category: "Proteins", emoji: "🐷", aliases: ["pork chops"] },
  { name: "Turkey", category: "Proteins", emoji: "🦃", aliases: ["turkey breast"] },
  { name: "Tuna", category: "Proteins", emoji: "🐟", aliases: ["tuna fish"] },
  { name: "Cod", category: "Proteins", emoji: "🐟", aliases: ["white fish"] },
  { name: "Lamb", category: "Proteins", emoji: "🐑", aliases: ["lamb chops"] },
  { name: "Duck", category: "Proteins", emoji: "🦆", aliases: ["duck breast"] },

  // Vegetables
  { name: "Tomatoes", category: "Vegetables", emoji: "🍅", popular: true, aliases: ["tomato"] },
  { name: "Onions", category: "Vegetables", emoji: "🧅", popular: true, aliases: ["onion"] },
  { name: "Garlic", category: "Vegetables", emoji: "🧄", popular: true, aliases: ["garlic cloves"] },
  { name: "Bell Peppers", category: "Vegetables", emoji: "🫑", popular: true, aliases: ["peppers", "capsicum"] },
  { name: "Carrots", category: "Vegetables", emoji: "🥕", popular: true, aliases: ["carrot"] },
  { name: "Broccoli", category: "Vegetables", emoji: "🥦", aliases: ["broccoli florets"] },
  { name: "Spinach", category: "Vegetables", emoji: "🥬", aliases: ["baby spinach"] },
  { name: "Mushrooms", category: "Vegetables", emoji: "🍄", aliases: ["mushroom", "button mushrooms"] },
  { name: "Zucchini", category: "Vegetables", emoji: "🥒", aliases: ["courgette"] },
  { name: "Eggplant", category: "Vegetables", emoji: "🍆", aliases: ["aubergine"] },
  { name: "Cauliflower", category: "Vegetables", emoji: "🥬", aliases: ["cauliflower florets"] },
  { name: "Green Beans", category: "Vegetables", emoji: "🫘", aliases: ["beans"] },
  { name: "Asparagus", category: "Vegetables", emoji: "🥬", aliases: ["asparagus spears"] },
  { name: "Brussels Sprouts", category: "Vegetables", emoji: "🥬", aliases: ["sprouts"] },
  { name: "Sweet Potatoes", category: "Vegetables", emoji: "🍠", aliases: ["sweet potato"] },
  { name: "Potatoes", category: "Vegetables", emoji: "🥔", aliases: ["potato"] },
  { name: "Cucumber", category: "Vegetables", emoji: "🥒", aliases: ["cucumbers"] },
  { name: "Lettuce", category: "Vegetables", emoji: "🥬", aliases: ["salad leaves"] },
  { name: "Celery", category: "Vegetables", emoji: "🥬", aliases: ["celery stalks"] },
  { name: "Corn", category: "Vegetables", emoji: "🌽", aliases: ["sweet corn", "corn kernels"] },

  // Fruits
  { name: "Lemons", category: "Fruits", emoji: "🍋", popular: true, aliases: ["lemon"] },
  { name: "Limes", category: "Fruits", emoji: "🍋", aliases: ["lime"] },
  { name: "Apples", category: "Fruits", emoji: "🍎", aliases: ["apple"] },
  { name: "Bananas", category: "Fruits", emoji: "🍌", aliases: ["banana"] },
  { name: "Oranges", category: "Fruits", emoji: "🍊", aliases: ["orange"] },
  { name: "Strawberries", category: "Fruits", emoji: "🍓", aliases: ["strawberry"] },
  { name: "Blueberries", category: "Fruits", emoji: "🫐", aliases: ["blueberry"] },
  { name: "Avocado", category: "Fruits", emoji: "🥑", aliases: ["avocados"] },
  { name: "Mango", category: "Fruits", emoji: "🥭", aliases: ["mangoes"] },
  { name: "Pineapple", category: "Fruits", emoji: "🍍", aliases: ["pineapples"] },
  { name: "Grapes", category: "Fruits", emoji: "🍇", aliases: ["grape"] },
  { name: "Cherries", category: "Fruits", emoji: "🍒", aliases: ["cherry"] },

  // Grains & Starches
  { name: "Rice", category: "Grains", emoji: "🍚", popular: true, aliases: ["white rice", "brown rice"] },
  { name: "Pasta", category: "Grains", emoji: "🍝", popular: true, aliases: ["spaghetti", "noodles"] },
  { name: "Bread", category: "Grains", emoji: "🍞", aliases: ["loaf", "sliced bread"] },
  { name: "Quinoa", category: "Grains", emoji: "🌾", aliases: ["quinoa grain"] },
  { name: "Oats", category: "Grains", emoji: "🌾", aliases: ["rolled oats", "oatmeal"] },
  { name: "Flour", category: "Grains", emoji: "🌾", aliases: ["all-purpose flour", "wheat flour"] },
  { name: "Couscous", category: "Grains", emoji: "🌾", aliases: ["couscous grain"] },
  { name: "Barley", category: "Grains", emoji: "🌾", aliases: ["pearl barley"] },
  { name: "Bulgur", category: "Grains", emoji: "🌾", aliases: ["bulgur wheat"] },

  // Dairy & Alternatives
  { name: "Milk", category: "Dairy", emoji: "🥛", aliases: ["whole milk", "skim milk"] },
  { name: "Cheese", category: "Dairy", emoji: "🧀", aliases: ["cheddar", "mozzarella"] },
  { name: "Yogurt", category: "Dairy", emoji: "🥛", aliases: ["greek yogurt", "plain yogurt"] },
  { name: "Butter", category: "Dairy", emoji: "🧈", aliases: ["unsalted butter"] },
  { name: "Cream", category: "Dairy", emoji: "🥛", aliases: ["heavy cream", "whipping cream"] },
  { name: "Sour Cream", category: "Dairy", emoji: "🥛", aliases: ["sour cream"] },
  { name: "Cream Cheese", category: "Dairy", emoji: "🧀", aliases: ["philadelphia"] },
  { name: "Parmesan", category: "Dairy", emoji: "🧀", aliases: ["parmesan cheese", "parmigiano"] },
  { name: "Feta", category: "Dairy", emoji: "🧀", aliases: ["feta cheese"] },
  { name: "Coconut Milk", category: "Dairy", emoji: "🥥", aliases: ["coconut cream"] },
  { name: "Almond Milk", category: "Dairy", emoji: "🥛", aliases: ["almond milk"] },

  // Herbs & Spices
  { name: "Basil", category: "Herbs & Spices", emoji: "🌿", aliases: ["fresh basil", "basil leaves"] },
  { name: "Oregano", category: "Herbs & Spices", emoji: "🌿", aliases: ["dried oregano"] },
  { name: "Thyme", category: "Herbs & Spices", emoji: "🌿", aliases: ["fresh thyme"] },
  { name: "Rosemary", category: "Herbs & Spices", emoji: "🌿", aliases: ["fresh rosemary"] },
  { name: "Parsley", category: "Herbs & Spices", emoji: "🌿", aliases: ["fresh parsley", "flat-leaf parsley"] },
  { name: "Cilantro", category: "Herbs & Spices", emoji: "🌿", aliases: ["coriander", "fresh cilantro"] },
  { name: "Dill", category: "Herbs & Spices", emoji: "🌿", aliases: ["fresh dill"] },
  { name: "Sage", category: "Herbs & Spices", emoji: "🌿", aliases: ["fresh sage"] },
  { name: "Mint", category: "Herbs & Spices", emoji: "🌿", aliases: ["fresh mint"] },
  { name: "Black Pepper", category: "Herbs & Spices", emoji: "🌶️", aliases: ["pepper", "ground pepper"] },
  { name: "Salt", category: "Herbs & Spices", emoji: "🧂", aliases: ["sea salt", "table salt"] },
  { name: "Paprika", category: "Herbs & Spices", emoji: "🌶️", aliases: ["sweet paprika"] },
  { name: "Cumin", category: "Herbs & Spices", emoji: "🌶️", aliases: ["ground cumin"] },
  { name: "Turmeric", category: "Herbs & Spices", emoji: "🌶️", aliases: ["ground turmeric"] },
  { name: "Ginger", category: "Herbs & Spices", emoji: "🫚", aliases: ["fresh ginger", "ginger root"] },
  { name: "Cinnamon", category: "Herbs & Spices", emoji: "🌶️", aliases: ["ground cinnamon"] },
  { name: "Nutmeg", category: "Herbs & Spices", emoji: "🌶️", aliases: ["ground nutmeg"] },
  { name: "Cardamom", category: "Herbs & Spices", emoji: "🌶️", aliases: ["ground cardamom"] },
  { name: "Bay Leaves", category: "Herbs & Spices", emoji: "🌿", aliases: ["bay leaf"] },
  { name: "Red Pepper Flakes", category: "Herbs & Spices", emoji: "🌶️", aliases: ["chili flakes"] },

  // Oils & Condiments
  { name: "Olive Oil", category: "Oils & Condiments", emoji: "🫒", popular: true, aliases: ["extra virgin olive oil"] },
  { name: "Vegetable Oil", category: "Oils & Condiments", emoji: "🛢️", aliases: ["cooking oil"] },
  { name: "Coconut Oil", category: "Oils & Condiments", emoji: "🥥", aliases: ["virgin coconut oil"] },
  { name: "Sesame Oil", category: "Oils & Condiments", emoji: "🛢️", aliases: ["toasted sesame oil"] },
  { name: "Soy Sauce", category: "Oils & Condiments", emoji: "🥢", aliases: ["light soy sauce", "dark soy sauce"] },
  { name: "Vinegar", category: "Oils & Condiments", emoji: "🍶", aliases: ["white vinegar", "apple cider vinegar"] },
  { name: "Balsamic Vinegar", category: "Oils & Condiments", emoji: "🍶", aliases: ["balsamic"] },
  { name: "Honey", category: "Oils & Condiments", emoji: "🍯", aliases: ["raw honey"] },
  { name: "Maple Syrup", category: "Oils & Condiments", emoji: "🍁", aliases: ["pure maple syrup"] },
  { name: "Mustard", category: "Oils & Condiments", emoji: "🌭", aliases: ["dijon mustard", "yellow mustard"] },
  { name: "Ketchup", category: "Oils & Condiments", emoji: "🍅", aliases: ["tomato ketchup"] },
  { name: "Mayonnaise", category: "Oils & Condiments", emoji: "🥪", aliases: ["mayo"] },
  { name: "Hot Sauce", category: "Oils & Condiments", emoji: "🌶️", aliases: ["chili sauce", "sriracha"] },

  // Legumes & Nuts
  { name: "Black Beans", category: "Legumes & Nuts", emoji: "🫘", aliases: ["beans"] },
  { name: "Chickpeas", category: "Legumes & Nuts", emoji: "🫘", aliases: ["garbanzo beans"] },
  { name: "Lentils", category: "Legumes & Nuts", emoji: "🫘", aliases: ["red lentils", "green lentils"] },
  { name: "Kidney Beans", category: "Legumes & Nuts", emoji: "🫘", aliases: ["red kidney beans"] },
  { name: "Almonds", category: "Legumes & Nuts", emoji: "🥜", aliases: ["sliced almonds"] },
  { name: "Walnuts", category: "Legumes & Nuts", emoji: "🥜", aliases: ["chopped walnuts"] },
  { name: "Peanuts", category: "Legumes & Nuts", emoji: "🥜", aliases: ["roasted peanuts"] },
  { name: "Cashews", category: "Legumes & Nuts", emoji: "🥜", aliases: ["raw cashews"] },
  { name: "Pine Nuts", category: "Legumes & Nuts", emoji: "🥜", aliases: ["pine nuts"] },
  { name: "Pecans", category: "Legumes & Nuts", emoji: "🥜", aliases: ["pecan halves"] },

  // Seafood
  { name: "Crab", category: "Seafood", emoji: "🦀", aliases: ["crab meat"] },
  { name: "Lobster", category: "Seafood", emoji: "🦞", aliases: ["lobster tail"] },
  { name: "Scallops", category: "Seafood", emoji: "🐚", aliases: ["sea scallops"] },
  { name: "Mussels", category: "Seafood", emoji: "🦪", aliases: ["blue mussels"] },
  { name: "Oysters", category: "Seafood", emoji: "🦪", aliases: ["fresh oysters"] },
  { name: "Clams", category: "Seafood", emoji: "🐚", aliases: ["littleneck clams"] },
  { name: "Squid", category: "Seafood", emoji: "🦑", aliases: ["calamari"] },
  { name: "Octopus", category: "Seafood", emoji: "🐙", aliases: ["baby octopus"] },

  // Baking Essentials
  { name: "Sugar", category: "Baking", emoji: "🍯", aliases: ["white sugar", "granulated sugar"] },
  { name: "Brown Sugar", category: "Baking", emoji: "🍯", aliases: ["light brown sugar"] },
  { name: "Baking Powder", category: "Baking", emoji: "🥄", aliases: ["baking powder"] },
  { name: "Baking Soda", category: "Baking", emoji: "🥄", aliases: ["sodium bicarbonate"] },
  { name: "Vanilla Extract", category: "Baking", emoji: "🌟", aliases: ["pure vanilla"] },
  { name: "Cocoa Powder", category: "Baking", emoji: "🍫", aliases: ["unsweetened cocoa"] },
  { name: "Chocolate Chips", category: "Baking", emoji: "🍫", aliases: ["semi-sweet chocolate chips"] },
  { name: "Powdered Sugar", category: "Baking", emoji: "🍯", aliases: ["confectioners sugar", "icing sugar"] },
]

export function getIngredientStats() {
  const stats = {
    total: INGREDIENT_LIST.length,
    byCategory: {} as Record<string, number>,
    popular: INGREDIENT_LIST.filter((item) => item.popular).length,
  }

  INGREDIENT_LIST.forEach((ingredient) => {
    stats.byCategory[ingredient.category] = (stats.byCategory[ingredient.category] || 0) + 1
  })

  return stats
}

// Export popular ingredients function
export function getPopularIngredients() {
  return INGREDIENT_LIST.filter((item) => item.popular).slice(0, 12)
}

// Export ingredients by category
export function getIngredientsByCategory(category: string) {
  return INGREDIENT_LIST.filter((item) => item.category === category)
}

// Search ingredients function
export function searchIngredients(query: string, limit = 10) {
  const searchTerm = query.toLowerCase()
  return INGREDIENT_LIST.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.aliases?.some((alias) => alias.toLowerCase().includes(searchTerm)),
  ).slice(0, limit)
}
