export const addItemToCart = (currentItems,itemToAdd) =>{
    const item = currentItems.find(item=>item.id === itemToAdd.id);

    if(item) {
        return currentItems.map(currentItem=>{
            if(currentItem.id === item.id) {
              return {...currentItem,  quantity:currentItem.quantity + 1}
            }
            return currentItem;
        })
    }
    return [...currentItems,{...itemToAdd,quantity:1}];
}

export const removeItemFromCart  = (currentItems,itemToRemove) => {
    const currentItem = currentItems.find(currentItem=>currentItem.id === itemToRemove.id);

    if(currentItem.quantity === 1) {
        return currentItems.filter(item=>currentItem.id !== item.id)
    }
    return currentItems.map(item=>{
        return  item.id === currentItem.id ? {...currentItem,quantity:currentItem.quantity - 1}:item
    });
}