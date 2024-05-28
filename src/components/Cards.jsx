import { useEffect, useState } from 'react';
import './cards.css'
import { useSelector, useDispatch } from 'react-redux';
import { setData, setSearch } from '../redux/slices/dataSlice';
import {useNavigate} from 'react-router-dom';

const Cards = () => {

    const [data, setdata] = useState([]);
    const cardData = useSelector((state) => state.data.data);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        setdata(cardData)
    }, [cardData])


    return (
        <div className='cards'>
            <div className='cards-main'>
                <div className='addmore'>

                </div>
                {
                    data.length === 0  ?

                        <div className='empty'>
                            <h1>Warehouse Not available</h1>
                        </div>

                        : data.map((item) => {
                            return (
                                <div className='card' key={item.id} onClick={() => navigate(`/warehouse/:${item.id}`)}>
                                    <span className='code'>{item.code}</span>
                                    <h2>{item.name}</h2>
                                    <div className='available'>
                                        <span>Space Available: {item.space_available}</span>
                                        <span>Cluster: {item.cluster}</span>
                                    </div>
                                    <strong>Type: {item.type}</strong>
                                    <p>City: {item.city}</p>
                                    <div className='is'>
                                        <span>Is_Live: {item.is_live ? 'Yes' : 'No'}</span>
                                        <span>Is_Registered: {item.is_registered ? 'Yes' : 'No'}</span>
                                    </div>
                                    <button>Check this out</button>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Cards;