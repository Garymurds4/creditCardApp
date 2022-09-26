import React, { useEffect, useState } from "react"
import {Grid,Button,TextField} from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import createStyles from "@mui/styles/createStyles"
import "react-credit-cards/es/styles-compiled.css"
import '../../App.css'
//import { set } from "lodash"
//import Results from "./Results";

const useStyles = makeStyles((theme) =>
  createStyles({
    TextFieldFull:{
      width: "90%",
      //paddingBottom: "20px"
    },
    Button:{
      width: "45%"
    },
    GridControl:{
        display:"flex", 
        direction:"row",
        flexDirection:"row",
        justifyContent: "center",
        marginBottom: 20
    },
    heading: {
      textAlign: "center",
      fontSize: 30,
      color: "#0F5C59",
      marginLeft: 10,
      marginBottom: 20,
    }
  })
);

function AddBannedCountry({bannedCountries, newBannedCountry}) {
    const classes = useStyles();
    const [country, setCountry] = useState("");
    const [focus, SetFocus] = useState("");
    const [error, setError] = useState("");
    //const [bannedCountries, setBannedCountries] = useState([{name: 'russia'},{name: 'america'},{name: "sa"}])
    
    const validateCountry = (test) => {
        return bannedCountries.map((name)=> {
            if(test.toLowerCase() === name.name){
                setError("Already a banned country")
                setCountry("")
                return true
            }else{
                return false
            }
        })     
    }
    useEffect(()=>{
        console.log("countries", bannedCountries)  
    },[])

    function onSubmit(e) {
        e.preventDefault() 
        if(!validateCountry(country).includes(true)){
                 console.log(country)
                 console.log("countries", bannedCountries)
                 newBannedCountry(country)
                 setCountry("")}
    }


    return (
        <form className="card-form" onSubmit ={onSubmit}>
            <h2 className="text-center">Add a new country to banned list</h2>
                <Grid container className={classes.GridControl} lg={12}>
                    <TextField
                    className={classes.TextFieldFull}
                    required
                    type="text"
                    size="small"
                    placeholder="Country"
                    name="number"
                    value={country}
                    helperText={error}
                    error={!!error}
                    onClick={() => setError("")}
                    onFocus={(e) => SetFocus(e.target.name)}
                    onChange={(e) => setCountry(e.target.value)}
                    />
                </Grid>
                
                <Grid container align="center">
                          <Grid item lg={12} xs={12}>
                            <Button type="submit" className={classes.Button} variant="outlined" style={{marginBottom: 20}}>
                                Submit
                            </Button>
                          </Grid>
                </Grid>  
           
    </form>
  );
}

export default AddBannedCountry;
