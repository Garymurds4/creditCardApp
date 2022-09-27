import React, { useState } from "react"
import {Grid,Box,Button,TextField} from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import createStyles from "@mui/styles/createStyles"
import "react-credit-cards/es/styles-compiled.css"
import '../../App.css'
//import { set } from "lodash"
//import Results from "./Results";

const useStyles = makeStyles((theme) =>
  createStyles({
    Box:{
        width: "450px",
        margin: "10px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 14px 80px rgb(34 35 58 / 40%)",
        padding: "10px 20px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    TextFieldFull:{
        width: "100%",
    },
    Button:{
        width: "45%",
    },
    Grid:{
        display:"flex", 
        direction:"row",
        flexDirection:"row",
        justifyContent: "center",
        marginBottom: 15
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
    const [error, setError] = useState("");
    
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

    function onSubmit(e) {
        e.preventDefault() 
        if(!validateCountry(country).includes(true)){
                 newBannedCountry(country.toLowerCase())
                 setCountry("")}
    }


    return (
        <Box className={classes.Box}>
        <form onSubmit ={onSubmit}>
            <h2 style={{textAlign: "center"}}>Add a new country to banned list</h2>
                <Grid container className={classes.Grid} lg={12}>
                    <TextField
                    className={classes.TextFieldFull}
                    required
                    type="text"
                    size="small"
                    placeholder="Country"
                    value={country}
                    helperText={error}
                    error={!!error}
                    onClick={() => setError("")}
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
        </Box>
  );
}

export default AddBannedCountry;
