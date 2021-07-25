export const addItemToCart = (currentItems,itemToAdd) =>{
    const item = currentItems.find(item=>item.id === itemToAdd.id);

    if(item) {
        return currentItems.map(currentItem=>{
            if(currentItem.id === item.id) {
                currentItem.quantity = currentItem.quantity + 1
            }
            return currentItem;
        })
    }
    return [...currentItems,{...itemToAdd,quantity:1}];
}