import { useParams } from 'react-router';
import './warehouse.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Stack, TextField } from '@mui/material';
import { setUpdatedData } from '../redux/slices/dataSlice';


const Warehouse = () => {

    // let warehouseData;
    let params = useParams();
    let id = Number(params.id.slice(1, params.length));

    let dispatch = useDispatch();
    const allWarehouseData = useSelector(state => state.data.data);


    const [warehouseData, setWarehouseData] = useState([]); 
    const [popup, setPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        cluster: '',
        city: '',
        spaceAvailable: '',
        liveStatus: '',
    });


    useEffect(() => {
        let data = allWarehouseData.filter((item) => item.id == id);
        setWarehouseData(data);
    }, [allWarehouseData, id])


    // *************************************************************************************


    const openPopUp = () => {
        setPopup(true);
    }

    // *************************************************************************************


    const closePopup = () => {

        const updatedAllWarehouseData = allWarehouseData.map(item =>
            item.id === id ? { ...item, 
                name: formData.name || item.name,
                cluster: formData.cluster || item.cluster,
                city: formData.city || item.city,
                space_available: formData.spaceAvailable || item.space_available,
                is_live: formData.liveStatus
            } : item
        );

        const updatedWarehouseData = warehouseData.map(item =>
            item.id === id ? { ...item, 
                name: formData.name || item.name,
                cluster: formData.cluster || item.cluster,
                city: formData.city || item.city,
                space_available: formData.spaceAvailable || item.space_available,
                is_live: formData.liveStatus
            } : item
        );

        
        // console.log('====================================');
        // console.log(remainingWarehouseData);
        // console.log('====================================');

        setWarehouseData(updatedWarehouseData);
        dispatch(setUpdatedData(updatedAllWarehouseData));
        setPopup(false);
    }

    console.log(warehouseData);

    // *************************************************************************************

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }
    
    console.log(formData);

    return (
        <div className='warehouse'>
            {
                warehouseData && warehouseData.map((item) => {
                    return (
                        <div key={item.id} className="warehouse-main">
                            <h2>{item.code}</h2>
                            <h1>{item.name}</h1>
                            {/* <span className='code'>{item.code}</span> */}
                            <strong>Type: {item.type}</strong>
                            <div className='available'>
                                <span>Space Available: {item.space_available}</span>
                                <span>Cluster: {item.cluster}</span>
                            </div>
                            <p>City: {item.city}</p>
                            <div className='is'>
                                <span>Is Live: {item.is_live ? 'Yes' : 'No'}</span>
                                <span>Is Registered: {item.is_registered ? 'Yes' : 'No'}</span>
                            </div>
                            <button onClick={openPopUp}>Edit Warehouse Data</button>
                        </div>
                    )
                })
            }

            <Dialog open={popup} fullWidth maxWidth='sm'>
                <DialogTitle>Edit WareHouse Data</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Hello</DialogContentText> */}
                    <Stack spacing={2} margin={2}>

                        <TextField name='name'
                            label='Name'
                            value={formData.name}
                            onChange={handleChange}>

                        </TextField>

                        <TextField name='cluster'
                            label='Cluster'
                            value={formData.cluster}
                            onChange={handleChange}>

                        </TextField>

                        <TextField name='city'
                            label='City'
                            value={formData.city}
                            onChange={handleChange}>

                        </TextField>

                        <TextField name='spaceAvailable'
                            label='Space Available'
                            value={formData.spaceAvailable}
                            onChange={handleChange}>

                        </TextField>

                        <TextField name='liveStatus'
                            label='Live Status'
                            value={formData.liveStatus}
                            onChange={handleChange}>

                        </TextField>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button style={{ margin: 'auto', width: '10rem' }} color='error' variant='contained' onClick={closePopup}>Cancel</Button>
                    <Button style={{ margin: 'auto', width: '10rem' }} color='success' variant='contained' onClick={closePopup}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Warehouse;