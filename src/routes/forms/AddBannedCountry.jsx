import React, { useState } from "react"
import {Grid,Box,Button,TextField,ListItem,List,ListItemText} from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import createStyles from "@mui/styles/createStyles"
import "react-credit-cards/es/styles-compiled.css"

const useStyles = makeStyles((theme) =>
  createStyles({
    Box:{
        width: "450px",
        margin: "10px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 14px 80px rgb(34 35 58 / 40%)",
        padding: "0px 20px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    TextFieldFull:{
        width: "100%",
        marginTop: 20
    },
    Button:{
        width: "45%",
    },
    Grid:{
        display:"flex", 
        direction:"row",
        flexDirection:"row",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 15
    },
    List:{
        alignItems:"center",
        minHeight: 235,
        maxWidth: 370,
        minWidth: 300,
    }
  })
);

function AddBannedCountry({bannedCountries, newBannedCountry}) {
    const classes = useStyles();
    const [country, setCountry] = useState("");
    const [error, setError] = useState("");
    
    //Validation check for duplicate name before adding to array
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

    //Form submit done to check before sending to parent component
    function onSubmit(e) {
        e.preventDefault() 
        if(!validateCountry(country).includes(true)){
                 newBannedCountry(country.toLowerCase())
                 setCountry("")
        }
    }

    return (
        <Box fullwidth className={classes.Box}>
        <form onSubmit ={onSubmit}>
            <h2 style={{textAlign: "center", color: "#0c69cc"}}>Banned list of countries</h2>

            <List className={classes.List}>
                    {bannedCountries.map((name) => {
                            return  <ListItem disablePadding divider="true">
                                        <ListItemText>{name.name}</ListItemText>
                                    </ListItem>
                    })}
            </List>

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
