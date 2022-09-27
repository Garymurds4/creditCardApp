import React from "react"
import {Grid,Box} from "@mui/material"
import Card from "react-credit-cards"
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
        padding: "10px 20px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    })
);

function DisplayCards() {
    const classes = useStyles();
    const result = JSON.parse(sessionStorage.getItem('Cards'));

    return (
        <>
            {result && result.map((object)=> {
                return( 
                    <Grid lg={12} xs={12}>
                        <Box className={classes.Box}>
                            <h2>Country: {object.country} CVC: {object.cvc}</h2>
                                <Card
                                    style={{paddingTop: 20}}
                                    number={object.cardNumber}
                                    name={object.name}
                                    expiry={object.expiry}
                                    cvc={object.cvc}
                                />
                        </Box>
                    </Grid>
                )
            })}
        </>
    );
}

export default DisplayCards;
