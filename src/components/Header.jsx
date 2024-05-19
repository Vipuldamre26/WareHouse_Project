
import { useEffect, useRef, useState } from 'react';
import './header.css'
import { IoSearch } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { setData, setFilteredData, setSearch } from '../redux/slices/dataSlice';

function Header() {

    const dispatch = useDispatch();
    const statedata = useSelector((state) => state.data.data);
    // console.log('====================================');
    // console.log(statedata);
    // console.log('====================================');
    
    const [ data, setdata ] = useState([]);
    const [ city, setCity ] = useState([]);
    const [ cluster, setCluster ] = useState([]);
    const ref1 = useRef();
    // console.log(ref1.current.value);
    // console.log(data);

    const [ selectedCity, setSelectedCity ] = useState('');
    const [ selectedCluster, setSelectedCluster ] = useState('');
    const [ selectedSpace, setSelectedSpace ] = useState([]);
    
    
    
    // ************************************************************************************
    
    
    const fetchingDataFromRedux = (data) => {

        setdata(statedata);

        if(data){
            let cityData = data.map((item) => {
                return item.city;
            })
            
            let clusterData = data.map((item) => {
                return item.cluster;
            })
            
            cityData = Array.from(new Set(cityData));
            clusterData = Array.from(new Set(clusterData)).sort();

            setCity(cityData);
            setCluster(clusterData);
        }
        
    }
    
    // ************************************************************************************
    
    
    useEffect(() => {
        if(statedata){
            fetchingDataFromRedux(statedata);
            
        }
    }, [statedata])

        // ************************************************************************************


    const handleSearch = () => {

        // console.log(ref1.current.value);
        let searchValue = ref1.current.value.toLowerCase();

        if(searchValue !== ''){
            let newData = data.filter((item) => {
                // console.log(item.name.toLowerCase().includes(searchValue.toLowerCase()));
                return item.name.toLowerCase().includes(searchValue);
            })
            // console.log(newData);
            // console.log(data);
            dispatch(setSearch(newData));
        }
        else if(searchValue === ''){
            dispatch(setData());
        }

    }

        // ************************************************************************************


        const getCity = (e) => {
            console.log(e.target.value);
            let city = e.target.value;
            setSelectedCity(city);
        }
        // ************************************************************************************


        const getCluster = (e) => {
            let cluster = e.target.value;
            setSelectedCluster(cluster);
        }
        // ************************************************************************************


        const getSpace = (e) => {
            console.log(e.target.value);
            let space = e.target.value;
            let arr = space.split('-');
            let arrayNum = arr.map(Number);
            setSelectedSpace(arrayNum);
        }

        // ************************************************************************************

        const filterWarehouse = () => {
            console.log(selectedCity, selectedCluster, selectedSpace);

            if(selectedCity === '' && selectedCluster === '' && selectedSpace.length === 0){
                alert('Please select at least one filter');
                return
            }

            let newFilteredData = statedata;

            if(selectedCity !== ''){
                newFilteredData = statedata.filter((item) => {
                    return item.city.toLowerCase().includes(selectedCity.toLowerCase());
                })
            }

            if(selectedCluster !== ''){
                newFilteredData = newFilteredData.filter((item) => {
                    return item.cluster.toLowerCase().includes(selectedCluster.toLowerCase());
                })
            }

            if(selectedSpace.length !== 0){
                newFilteredData = newFilteredData.filter((item) => {
                    let num = Number(item.space_available);
                    return checkRange(num, selectedSpace);
                })
            }

        

            console.log(newFilteredData);



            dispatch(setFilteredData(newFilteredData));

        }


        // ************************************************************************************

        const resetData = () => {
            dispatch(setData());
            setSelectedCity('');
            setSelectedCluster('');
            setSelectedSpace([]);
        }

        // ************************************************************************************

        const checkRange = (num, arr) => {
            return num >= arr[0] && num <= arr[1];
        }



    return (
        <div className='header'>
            <div className='upper-header'>
                <div className='icon'>
                    <h1>Warehouse</h1>
                </div>
                <div className='searchInput'>
                    <IoSearch className='searchIcon' />
                    <input ref={ref1} placeholder='Search Warehouse'></input>
                    <button onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className='lower-header'>
                <div className='city'>
                    <select onChange={(e) => getCity(e)}>
                            <option defaultChecked>City</option>
                        {
                            city.map((item, index) => {
                                return(
                                    <option key={index}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='cluster'>
                    <select onChange={(e) => getCluster(e)}>
                    <option defaultChecked>Cluster</option>
                        {
                            cluster.map((item, index) => {
                                return(
                                    <option key={index}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='space'>
                    <select onChange={(e) => getSpace(e)}>
                        <option defaultChecked>Space</option>
                        <option>1 - 101</option>
                        <option>101 - 10001</option>
                        <option>10001 - 100001</option>
                        <option>100001 - 10000001</option>
                        <option>10000001 - 1000000001</option>
                    </select>
                </div>
                <div className='lower-btn'>
                        <button onClick={filterWarehouse}>Filter</button>
                        <button onClick={resetData}>Reset</button>
                </div>
            </div>
        </div>
    )
}

export default Header;
