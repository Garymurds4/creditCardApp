import React, { useState, useEffect } from "react"
import {Grid,Button,TextField, Box, collapseClasses} from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import createStyles from "@mui/styles/createStyles"
import Card from "react-credit-cards"
import AddBannedCountry from "./AddBannedCountry"
import "react-credit-cards/es/styles-compiled.css"
import DisplayCards from "./DisplayCards"

const useStyles = makeStyles((theme) =>
  createStyles({
    Box:{
        display: "block",
        width: "450px",
        margin: "10px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 14px 80px rgb(34 35 58 / 40%)",
        padding: "10px 20px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    TextField:{
        width: "50%",
    },
    TextFieldFull:{
        width: "100%",
    },
    Button:{
        width: "45%"
    },
    Grid:{
        display:"flex", 
        direction:"column",
        flexDirection:"column",
        justifyContent: "center"
    },
    GridTop:{
        display:"flex", 
        direction:"column",
        flexDirection:"column",
        justifyContent: "center",
        marginTop: 20
    },
    GridBox:{
        display:"flex", 
        flexWrap: "wrap",
        direction:"column",
        justifyContent: "center",
    },
    GridBox2:{
        display:"flex", 
        flexWrap: "wrap",
        justifyContent: "center",
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

function CardForm() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [country, setCountry] = useState("");
    const [focus, SetFocus] = useState("");
    const [submittedData, setSubmittedData] = useState([]);
    const [error, setError] = useState("");
    const [bannedCountries, setBannedCountries] = useState([{name: 'russia'},{name: 'north korea'},{name: "sa"}])
    
    const newBannedCountry = (name) => {
        const newBannedCountry = {name: name}
        setBannedCountries([...bannedCountries,newBannedCountry])
    }

    const validateCountry = (test) => {
        return bannedCountries.map((name)=> {
            if(test.toLowerCase() === name.name){
                setError("Banned country")
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
                 console.log("test",submittedData)
                 sessionStorage.setItem('Cards', JSON.stringify([...submittedData,{ name, cardNumber, expiry, cvc, country }]));
                 setSubmittedData([...submittedData, { name, cardNumber, expiry, cvc, country }])
                 setCountry("")
        }
    }

    useEffect(()=>{
        //sessionStorage.setItem('Cards', JSON.stringify(submittedData));
        console.log(JSON.parse(sessionStorage.getItem('Cards')))
    },[submittedData])

    return (
        <>
            <Grid  className={classes.GridBox}>
                <Box className={classes.Box}>
                <form  onSubmit ={onSubmit}>
                    <h2 style={{textAlign: "center"}}>Credit Card Form</h2>
                    <Card
                            style={{paddingTop: 20}}
                            number={cardNumber}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focus}
                        />
                    <Grid container className={classes.GridTop}>
                        <TextField
                            className={classes.TextField}
                            required
                            type="text"
                            size="small"
                            name="number"
                            placeholder="Cardholder Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={(e) => SetFocus(e.target.name)}
                        />
                        <TextField
                            className={classes.TextField}
                            required
                            type="number"
                            size="small"
                            name="number"
                            placeholder="Card Number"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            onFocus={(e) => SetFocus(e.target.name)}
                        />
                    </Grid>
                    <Grid container className={classes.Grid}>
                        <TextField
                            className={classes.TextField}
                            required
                            type="text"
                            size="small"
                            name="number"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            onFocus={(e) => SetFocus(e.target.name)}
                        />
                        <TextField
                            className={classes.TextField}
                            required
                            type="number"
                            size="small"
                            name="cvc"
                            placeholder="CVC"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            onFocus={(e) => SetFocus(e.target.name)}
                        />
                    </Grid> 
                    <Grid className={classes.Grid}>
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
                            style={{marginBottom: 20}}
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
            </Box>
            <AddBannedCountry bannedCountries={bannedCountries} newBannedCountry={newBannedCountry}/>
        </Grid>

        
        <Grid className={classes.GridBox2}>
            <DisplayCards/>
        </Grid>
        
        
    </>
  );
}

export default CardForm;
