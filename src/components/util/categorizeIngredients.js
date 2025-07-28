export const categorizeIngredients = (ingredients) => {
    return ingredients.reduce((acc, ingredient) => {
        const categoryName = ingredient.category || 'Uncategorized';
        
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(ingredient.name);
        return acc;
    }, {});
};
