import React from "react"
import {Grid,Box, Typography} from "@mui/material"
import Card from "react-credit-cards"
import makeStyles from "@mui/styles/makeStyles"
import createStyles from "@mui/styles/createStyles"
import "react-credit-cards/es/styles-compiled.css"

const useStyles = makeStyles((theme) =>
  createStyles({
    Box:{
        margin: "10px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 14px 80px rgb(34 35 58 / 40%)",
        padding: "0px 20px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    Heading: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        color: "#0c69cc",
        marginLeft: 10,
        marginBottom: 20,
        fontFamily: "sans-serif", 
    }
    })
);

function DisplayCards() {
    const classes = useStyles();
    //Fetches data from session to map the cards 
    const result = JSON.parse(sessionStorage.getItem('Cards'));

    return (
        <>
            {result && result.map((object)=> {
                return( 
                    <Grid lg={12} xs={12}>
                        <Box className={classes.Box}>
                            <h2 style={{textAlign: "center", color: "#0c69cc"}}>{object.country}</h2>
                                <Card
                                    locale={{ valid: "Expires" }}
                                    style={{paddingTop: 20}}
                                    number={object.cardNumber}
                                    name={object.name}
                                    expiry={object.expiry}
                                    cvc={object.cvc}
                                />
                            <Typography className={classes.Heading}>CVC: {object.cvc}</Typography>
                        </Box>
                    </Grid>
                )
            })}
        </>
    );
}

export default DisplayCards;
