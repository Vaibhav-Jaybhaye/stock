import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash/get';
import moment from 'moment';
import * as actions from './actions';
class App extends React.PureComponent {
    componentDidMount() {
        this.props.fetchData();
    }
    getColor = change => {
        if (change === 'hasIncreased') {
            return 'green';
        } else if (change === "hasDecreased") {
            return 'red';
        }
        return 'white';
    }
    render() {
        return (
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>Ticker</th>
                            <th>Price</th>
                            <th>Last Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            get(this.props, 'stock.stock.data', []).map((singleRecord, key) => (
                                <tr key={key} style={{ backgroundColor: this.getColor(get(singleRecord, 'change', '')) }}>
                                    <td>{get(singleRecord, 'ticker', '')}</td>
                                    <td>{get(singleRecord, 'price', '')}</td>
                                    <td>{moment(get(singleRecord, `updates[${singleRecord.updates.length - 1}]`, '')).startOf('second').fromNow()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </React.Fragment>
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