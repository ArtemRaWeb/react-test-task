import { useCallback, useEffect, useState } from 'react';

import { debounce } from '../../helpers/debouncer';

const limit = 100000;
const tableSize = 20;
const cities = [
    'New York',
    'London',
    'Paris',
    'Tokyo',
    'Sydney',
    'Moscow',
    'Berlin',
    'Rome',
    'Toronto',
    'Beijing',
];
const countries = [
    'USA',
    'UK',
    'France',
    'Japan',
    'Australia',
    'Russia',
    'Germany',
    'Italy',
    'Canada',
    'China',
];

const TableHardData = () => {
    const [data, setData] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(limit);

    const generateRandomData = useCallback(() => {
        let arr = [];
        for (let i = 0; i < tableSize; i++) {
            arr.push({
                name: `Person${i + 1}`,
                city: cities[Math.floor(Math.random() * cities.length)],
                country: countries[Math.floor(Math.random() * countries.length)],
                incomeAmount: Math.floor(Math.random() * limit),
                totalRevenue: Math.floor(Math.random() * limit),
            });
        }
        const filteredData = arr.filter(
            item => item.incomeAmount >= minValue && item.incomeAmount <= maxValue
        );
        setData(filteredData);
    }, [minValue, maxValue]);

    const debouncedGenerateRandomData = useCallback(debounce(generateRandomData, 1000), []);

    useEffect(() => {
        debouncedGenerateRandomData();
    }, [debouncedGenerateRandomData, minValue, maxValue]);

    return (
        <div>
            <label>
                Income range:
                <input
                    type="range"
                    min="0"
                    max={limit}
                    value={minValue}
                    onChange={event => setMinValue(Number(event.target.value))}
                />
                <input
                    type="range"
                    min="0"
                    max={limit}
                    value={maxValue}
                    onChange={event => setMaxValue(Number(event.target.value))}
                />
            </label>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>City</th>
                        <th>Country</th>
                        <th>Income Amount</th>
                        <th>Total Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.city}</td>
                            <td>{item.country}</td>
                            <td>{item.incomeAmount}</td>
                            <td>{item.totalRevenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableHardData;
