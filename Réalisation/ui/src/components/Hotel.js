import axios from "axios";

import React , { useState, useEffect }from 'react'

import { SelectedHotel, ShowHotel } from './ShowHotel';
import { Searchh } from './Searchh';

function Hotel() {
    const [message, setMessage] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [HotelPerPage, setHotelPerPage] = useState(8)
    const [dataSelected, setDataSelected] = useState([])
    
    const fetchData = async() =>{
        setLoading(true)
        const res = await axios.get('http://universities.hipolabs.com/search?')
        
        setData(res.data)
        setLoading(false)
        
    }
    
    useEffect(()=>{
        fetchData()
    }, 
    [])

    

    //selectHotel
    const selectHotel=(item)=>{
        console.log(item.strMeal)
        if(dataSelected.length == 0 || !dataSelected.find((e) => e.strMeal == item.strMeal)){
            axios.post('http://127.0.0.1:8000/api/favorite', item)
            .then((res => {
                setDataSelected([...dataSelected,res.data])
                getData()
            }))
        }else{
            message()

        }
    }

    //get selected Data
    const getData = ()=>{
        axios.get('http://127.0.0.1:8000/api/favorite').then((res=>{
            setDataSelected(res.data)
       }))
    }
    useEffect(() => {
        getData()
    }, []);
    
    // deletSelectedData
    const deletSelectedHotel = (item)=>{
        axios.delete(`http://127.0.0.1:8000//api/favorite/${item}`).then((res)=>{
            getData()
        })
    }

  return (
    <div className='container'>
    <div className='row'>
    <div className='col-md-9'>
    <div className='row'>
 
        <ShowHotel data={data} setData={setData}/>
    </div>
    </div>
    {/* <div className='col-md-3'>
        <div className='row'>
            <h4 className='fav'>Favorite</h4>
       
            
        </div>
    </div> */}
    </div>
</div>
  )
}

export default Hotel