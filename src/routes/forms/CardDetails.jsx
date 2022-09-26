import React, { useState } from "react"
import {Grid,Button,TextField} from "@mui/material"
import makeStyles from "@mui/styles/makeStyles"
import createStyles from "@mui/styles/createStyles"
import Card from "react-credit-cards"
import AddBannedCountry from "./AddBannedCountry"
import "react-credit-cards/es/styles-compiled.css"
import '../../App.css'
//import { set } from "lodash"
//import Results from "./Results";

const useStyles = makeStyles((theme) =>
  createStyles({
    TextField:{
      width: "45%",
    },
    TextFieldFull:{
      width: "90%",
    },
    Button:{
        width: "45%"
    },
    GridControl:{
        display:"flex", 
        direction:"row",
        flexDirection:"row",
        justifyContent: "center"
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
    const [index, setIndex] = useState(0);
    const [bannedCountries, setBannedCountries] = useState([{name: 'russia'},{name: 'america'},{name: "sa"}])
    
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
                 console.log({name, cardNumber, expiry, cvc, country})
                 sessionStorage.setItem(`card-${index}`, JSON.stringify({name, cardNumber, expiry, cvc, country}))
                 setIndex(index+1)
                 setSubmittedData([...submittedData, { name, cardNumber, expiry, cvc, country }])
                 setCountry("")}
    }


    return (
        <>
        <Grid container className={classes.GridControl}>
        <form className="card-form" onSubmit ={onSubmit}>
            <h2 className="text-center">Credit Card Form</h2>
            <Grid container className={classes.GridControl}>
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
            <Grid container className={classes.GridControl}>
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
                <Grid container align="center">
                          <Grid item lg={12} xs={12}>
                            <Button type="submit" className={classes.Button} variant="outlined" style={{marginBottom: 20}}>
                                Submit
                            </Button>
                          </Grid>
                </Grid>  
       
                <Card
                  style={{paddingTop: 20}}
                  number={cardNumber}
                  name={name}
                  expiry={expiry}
                  cvc={cvc}
                  focused={focus}
                />
      {/* <Results data={submittedData} /> */}
    </form>
    <AddBannedCountry bannedCountries={bannedCountries} newBannedCountry={newBannedCountry}/>
    </Grid>
    </>
  );
}

export default CardForm;
