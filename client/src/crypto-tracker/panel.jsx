import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
  },
}));

function PanelComponent(props) {
  const classes = useStyles();

  const changeColor = value =>  value < 0 ? {"color": "#f00606"} : {"color": "#11d811"};

  return (
    <div>
    <List className={classes.root}>
      <ListItem>
        <ListItemText><b>Coin</b></ListItemText>
        <ListItemText className="change">
            <span><b>Price</b></span>
            <span>(24hr Change)</span>
        </ListItemText>
      </ListItem>
    </List>
    <List className={classes.root}>
      {props.coinList.map(coin => {
      return (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <img src={coin.image} alt="crypto/" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>{coin.name}</ListItemText>
          <ListItemText className="change">
              <span>₹{coin.current_price.toLocaleString()} </span>
              (<span style={changeColor(coin.price_change_24h)}>₹{Number(coin.price_change_24h).toFixed(2)}</span>)
          </ListItemText>
        </ListItem>
      );
    })}
    </List>
    </div>
  );
}

export default PanelComponent;