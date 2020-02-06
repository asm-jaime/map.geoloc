import React from 'react';
import PropTypes from 'prop-types';

export const Store = React.createContext();

const initialState = {};
function geoposer(state, action) {

    console.log('action: ', action);
    console.log('state: ', state);

    switch (action.type) {
      case 'TEST':
        console.log('yes');
    }
}


export function StoreProvider(props) {
  const [state, dispatch] = React.useReducer(geoposer, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>{props.children}</Store.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.object
};
