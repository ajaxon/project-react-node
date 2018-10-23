
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });



function Confirmation(props) {

    const {classes, order} = props;

    if(order){
        return (
            <div>
            <Paper className={classes.root} elevation={1}>
              <Typography variant="h5" component="h3">
                Order id: {order._id}
              </Typography>
              <Typography component="p">
                {order.subscriptionLength} Days
              </Typography>
              <Typography component="p">
                Price : {order.price}
              </Typography>
            </Paper>
          </div>
        )
    }

   
}

Confirmation.PropTypes = {
    classes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
  };

export default withStyles(styles)(Confirmation);