const initialState = {
    stock: {
        data: [],
        error: ''
    }
}

/**
 * @method
 * @param  {array} previousData
 * @param  {array} latestData
 * @description Method to procces the fetched data and map it into required format.
 */
const getFinalData = (previousData, latestData) => {
    let allData = previousData;
    latestData.forEach(singleValue => {
        const valueIndex = allData.findIndex(x => x.ticker === singleValue[0]);
        if (valueIndex !== -1) {
            allData[valueIndex] = {
                ...allData[valueIndex],
                price: singleValue[1],
                updates: allData[valueIndex].updates.concat(new Date()),
                change: singleValue[1].toFixed(2) - allData[valueIndex].price.toFixed(2) > 0 ? 'hasIncreased' : 'hasDecreased'
            }
            return;
        }
        allData.push({
            ticker: singleValue[0],
            price: singleValue[1],
            updates: [new Date()],
            change: 'intialValue',
        });
    });
    return allData;
};
export const stockReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_STOCK_DATA": {
            return {
                ...state,
                stock: {
                    data: getFinalData(state.stock.data, JSON.parse(action.payload)),
                    error: ''
                }
            }
        }
        default:
            return state;
    }
}