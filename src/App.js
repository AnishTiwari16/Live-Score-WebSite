import React, {useEffect ,useState} from "react";
import logo from './logo.svg';
import './App.css';
import {Button,Grid,Typography} from "@material-ui/core";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import {getMatches} from "./api/Api";

function App() {
  const [matches,setMatches] = useState([]);//empty to store matches input
  useEffect(()=>{
    getMatches()
    .then((data)=> {
      setMatches(data.matches);
      console.log(data.matches);
    })
    .catch((erorr)=> alert("could not load Match data"));
  }, []);//will run on the first time
  return (
    <div className="App">
      <Navbar />
      <Typography style = {{marginTop:20}}variant = "h3">Welcome to Live Score Site</Typography>
      <Grid container>
        <Grid sm="2"></Grid>
        <Grid sm="8">
        {matches.map((match)=>(
        <React.Fragment key={match.unique_id}>
          {match.type=="Twenty20" ? (
          <Cards key={match.unique_id}match = {match}/>
          ): (
            ""
            )}
          </React.Fragment>
      ))}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
