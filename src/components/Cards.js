import {Card,CardContent,Typography, Grid, CardActions, Button, Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions} from "@material-ui/core";
import React, {useState, setOpen} from "react";
import { getMatchDetails } from "../api/Api";

const Cards=({match})=>{
    const [details, setDetails] = useState({});
    const [open, setOpen] = useState(false);
    const handleClick=(id)=>{
        getMatchDetails(id)
        .then((data)=>{
            console.log("MATCH DATA",data);
            setDetails(data);
            handleOpen();
        })
        .catch((error)=>console.log("ERROR", error));
    };
    const getCard=()=>{
        return(
            <Card style={{margin: 20}}>
                <CardContent>
                    <Grid container justify ="center" alignItems="center" spacing={4}>
                        <Grid item>
                            <Typography variant="h5">{match["team-1"]}</Typography>
                        </Grid>
                        <Grid item>
                            <img style = {{width:85}} src ={require("../img/vs.png").default} alt = ""></img>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">{match["team-2"]}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                <Grid container justify="center">
                <Button onClick={()=> {
                    handleClick(match.unique_id);

                }}item variant="outlined" color="primary">
                    Show Details
                    </Button>
                <Button style={{marginLeft:5}} item variant="contained" color="primary">
                    Start Time {new Date(match.dateTimeGMT).toLocaleString()}
                    </Button>
                </Grid>
                </CardActions>
            </Card>
        )
    };
    const handleClose = ()=>{
        setOpen(false);
    }
    const handleOpen=()=>{
        setOpen(true);
    }
    const getDialog=()=>(
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">{"Match Detail..."}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>{details.stat}</Typography>
                    <Typography>
                        Match
                        <span style={{fontStyle:"italic", fontWeight: "bold"}}>
                            {details.matchStarted ? "Started" : "Still not Started"}{" "}
                            </span>
                    </Typography>
                    <Typography>
                        Score
                        <span style={{fontStyle: "italics", fontWeight: "bold"}}></span>
                        {details.score}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick = {handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
    return (
        <React.Fragment>
            {getCard()}
        {getDialog()}
        </React.Fragment>
    );
};
export default Cards;