import {useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [searchData, setSearchData] = useState('')
  const [filterData, setFilterData] = useState([])
  var url = "https://jsonplaceholder.typicode.com/posts"

  useEffect(()=>{
    async function fetchdata() {
      var res = await fetch(url);
      var data = await res.json();
      setData(data);
      setFilterData(data);
      console.log(filterData);
      
    }
    fetchdata();
  },[]);
  // function handleSearch(e){
  //   setSearchData(e.target.value);
  //   var filterData = data.filter((item)=>{
  //     return item.title.includes(e.target.value);
  //   });
  //   setFilterData(filterData);
  // }
  useEffect(()=>{
    var filterData = data.filter((item)=>{
      return item.title.includes(searchData);
    });
    setFilterData(filterData);
    console.log(filterData);
  },[searchData]);
  return (
    <>
    <input type="text" placeholder="Search key..........." value={searchData} onChange={(e) => setSearchData(e.target.value) /*onChange=()*/}/>
    {     
      filterData.map((item) => {
        return <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.body}</p>
        </div> 
      })
    }
      
    </>
  )
}

export default App
