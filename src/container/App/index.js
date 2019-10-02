import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import moment from 'moment';
import * as actions from './actions';

/**
 * @class
 * @classdesc This class returns Stock data
 */
class App extends React.PureComponent {

    /**
     * @method
     * @description Fetches stock data
     */
    componentDidMount() {
        this.props.fetchData();
    }

    /**
     * @method
     * @param  {string} change
     * @description Method to get row color based on the price changes
     */
    getColor = change => {
        if (change === 'hasIncreased') {
            return 'green';
        } else if (change === "hasDecreased") {
            return 'red';
        }
        return 'white';
    }

    /**
     * @method
     * @description Method to render table header
     */
    renderTableHeader = () => (
        <thead>
            <tr>
                <th>Ticker</th>
                <th>Price</th>
                <th>Last Update</th>
            </tr>
        </thead>
    )

    /**
     * @method
     * @param  {object} stock
     * @description Method to render table data and applies color changes based on price updates
     */
    renderTableBody = stock => (
        <tbody>
            {
                get(stock, 'data', []).map((singleRecord, key) => (
                    <tr key={key} style={{ backgroundColor: this.getColor(get(singleRecord, 'change', '')) }}>
                        <td>{get(singleRecord, 'ticker', '')}</td>
                        <td>{get(singleRecord, 'price', '')}</td>
                        <td>{moment(get(singleRecord, `updates[${singleRecord.updates.length - 1}]`, '')).startOf('second').fromNow()}</td>
                    </tr>
                ))
            }
        </tbody>
    )
    render() {
        const { stock } = this.props.stock;
        return (
            <table>
                {this.renderTableHeader()}
                {this.renderTableBody(stock)}
            </table>
        );
    }
}

const mapStateToProps = state => (
    {
        stock: state.stock,
    }
)

const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(App);