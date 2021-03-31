import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        maxWidth: "100%",
    },
    media: {
        height: 0,
        padding: "56.25%", //16:9  }
    },
    cardActions: {
        display: "flex",
        justifyContent: "flex-end",
    },
    CardContent: {
        display: "flex",
        justifyContent: "space-between",
    },
}));