import React, { useEffect, useState } from 'react'
import {
    CssBaseLine,
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress,
    Divider,
    Button,
} from '@material-ui/core';
import useStyles from './styles';
import { Link, useHistory } from 'react-router-dom';
import { commerce } from '../../Library/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles();
    const history = useHistory();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckingToken] = useState(null);
    const [shippingData, setShippingData] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);

        nextStep();
    };

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: 'cart',
                });
                console.log("generateToken -> token", token);

                setCheckingToken(token);
            } catch {
                history.push("/");
            }
        };
        generateToken();
    }, [cart]);

    const Form = () => {
        return activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                shippingData={shippingData}
                checkoutToken={checkoutToken}
                backStep={backStep}
                onCaptureCheckout={onCaptureCheckout}
                nextStep={nextStep}
                timeOut={timeOut}
            />
        );
    };

    let Confirmation = () => 
        order.customer ? (
            <>
                <div>
                    <Typography variant="h5">
                        Thank you for your purchase, {order.customer.firstname}{""}
                        {order.customer.lastname}!
                    </Typography>
                    <Divider className={classes.divider} />
                    <Typography variant="subtitle2">
                        Order ref: {order.customer_reference}
                    </Typography>
                </div>
                <br />
                <Button component={Link} variant="outlined" type="button" to="/">
                    Back to Home
                </Button>
            </>
        ) : isFinished ? (
            <>
            <div>
                <Typography variant="h5">Thank you for your purchase!</Typography>
                <Divider className={classes.divider} />

                <br />
                <Button component={Link} variant="outlined" type="button" to="/">
                    Back to Home
                </Button>
            </div>
        </>
        ) : (
            <>
                <div className={classes.spinner}>
                    <CircularProgress />
                </div>
            </>
        );

        const timeOut = () => {
            setTimeout(() => {
                setIsFinished(true);
            }, 3000);
        };
        return (
            <div>
                <CssBaseLine />
                <div className={classes.toolbar} />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" align="center">
                            Checkout
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <Confirmation />
                        ) : (
                            checkoutToken && <Form />
                        )}
                    </Paper>
                </main>
            </div>
        );
};

export default Checkout;