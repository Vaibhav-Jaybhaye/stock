/**
 * @method
 * @description Action creator to fetch latest stock data.
 */
export const fetchData = () => {
    return dispatch => {
        const socket = new WebSocket('ws://stocks.mnet.website')
        socket.onmessage = response => {
            dispatch({
                type: 'FETCH_STOCK_DATA',
                payload: response.data,
            });
        }
    }
}