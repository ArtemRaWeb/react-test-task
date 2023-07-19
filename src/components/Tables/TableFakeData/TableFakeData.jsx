import { useCallback, useEffect, useRef, useState } from 'react';

import { debounce } from '../../../helpers/debouncer';

import { configureFakeBackend } from '../../../services/fake-backend';

import Loader from '../../Loader/Loader';

import './TableFakeData.css';

const limit = 200;

// Init fake fetch
configureFakeBackend();

const fetchData = async (min, max) => {
    console.log('Fetch new data with min: ' + min + ' max: ' + max);
    const response = await fetch(`/income?min=${min}&max=${max}`, { method: 'GET' });
    return JSON.parse(response.data);
};

const TableFakeData = () => {
    const [data, setData] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(limit);
    const [isLoading, setIsLoading] = useState(true);

    // Implementation using fake api
    const getData = useCallback(async (min, max) => {
        setIsLoading(true);
        const resp = await fetchData(min, max);
        setData(resp);
        setIsLoading(false);
    }, []);

    const debouncedFetchData = useRef(debounce(getData, 1000)).current;

    useEffect(() => {
        debouncedFetchData(minValue, maxValue);
    }, [debouncedFetchData, minValue, maxValue]);

    return (
        <div className="table-fake-data">
            <div>
                <label className="range-label" htmlFor="minValue">
                    From: {minValue}
                </label>
                <input
                    id="minValue"
                    type="range"
                    min="0"
                    max={limit}
                    value={minValue}
                    onChange={event => setMinValue(Number(event.target.value))}
                />
                <label className="range-label" htmlFor="maxValue">
                    To: {maxValue}
                </label>
                <input
                    id="maxValue"
                    type="range"
                    min="0"
                    max={limit}
                    value={maxValue}
                    onChange={event => setMaxValue(Number(event.target.value))}
                />
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>City</th>
                            <th>Income Amount</th>
                            <th>Total Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.city}</td>
                                <td>{item.incomeAmount}</td>
                                <td>{item.totalRevenue}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TableFakeData;
