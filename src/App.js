import { useState } from "react";
import axios from "axios"
import TestInfo from "./TestInfo";

function App() {
  const [postUrl, setpostUrl] = useState("");
  const [postName, setpostName] = useState("");
  const [postStatus , setpostStatus] = useState(false);
  const [getName, setGetName] = useState("");
  const [getStatus , setgetStatus] = useState(false);
  const [getTestInfo, setGetTestInfo] = useState(false);
  const [urls, setUrls] = useState([]);
  const [urlsFound, setUrlsFound] = useState(true)

  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log()
    setpostStatus(false)
    setgetStatus(false)
    setGetTestInfo(false)
    axios.post("http://localhost:4001/shorten",{name : postName , url : postUrl})
      .then(res => {
        console.log(res.data)
        setpostStatus(res.data)
      })
      .catch(err => {console.log(err)})
  }

  const getURL = (e)=>{
    e.preventDefault()
    setpostStatus(false)
    setgetStatus(false)
    axios.get(`http://localhost:4001/name/${getName}`)
      .then(res => {
        console.log(res.data)
        if(res.data === "No Test links found") setgetStatus("No Test links found")
        else setGetTestInfo(res.data)
      })
  }

  const getAllURLs = (e)=>{
    e.preventDefault()
    setpostStatus(false)
    setgetStatus(false)
    setGetTestInfo(false)
    
    axios.get(`http://localhost:4001/find-all/urls`)
      .then(res=>{
        if(res.data){
          console.log(res.data)
          setUrls(res.data)
        }else setUrlsFound(false)
      })
      .catch(err=>{
        console.log(err)
      })
  }

  return (
    <div>
    <h2>SHORTEN TEST LINK</h2>
    <form onSubmit = {(e)=>{handleSubmit(e)}}>
      <label>Enter Test Name </label>
        <input 
          required
          id = "name1" 
          type = "text" 
          onChange = {(e)=>{setpostName(e.target.value)}}/>
          <br/>
        <label>Enter URL to Shorten </label>
        <input 
          required
          id = "url" 
          type = "text" 
          onChange = {(e)=>{setpostUrl(e.target.value)}}/>
          <br/>
      <input type = "submit" value = "Shorten"/>
    </form>

    {postStatus? (<div>{postStatus}</div>): (<div></div>)}

    <h2>GET A TEST LINK</h2>
    <label>Enter Test Name </label>
    <form onSubmit = {(e)=>{getURL(e)}}>
      <input 
        required
        id = "name2" 
        type = "text" 
        onChange = {(e)=>{setGetName(e.target.value)}}/>
      <input type = "submit" value = "Get Link"/>
    </form>

    {getStatus? (<div>{getStatus}</div>) : (<div></div>)}
    {getTestInfo? 
      <TestInfo  name = {getTestInfo.name} visits = {getTestInfo.visits} short = {getTestInfo.short} full = {getTestInfo.full}/> : <div></div>
    }

    <h2>GET ALL TEST LINKS</h2>

    <form onSubmit = {(e)=>{getAllURLs(e)}}>
      <input value = "Get Test links" type = "submit"/>
    </form>

    { [urls]?
      <div>
      {urls.map(url =>(
        <TestInfo id = {url._id} name = {url.name} visits = {url.visits} short = {url.short} full = {url.full}/>))}
      </div> : <div></div>
    }
    {urlsFound?<div></div>:<div>No Test URLS found</div>}
    </div>
  );
}

export default App;
