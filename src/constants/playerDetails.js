import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faRunning, faShieldAlt, faUser, faWeight} from '@fortawesome/free-solid-svg-icons';

const playerDetails = [
  {
    id: 0,
    icon: <FontAwesomeIcon icon={faUser} />,
    label: 'Name',
    units: null,
    type: undefined,
    step: undefined
  },
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faShieldAlt} />,
    label: 'Armor Class',
    units: null,
    type: 'number',
    step: 1
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faEye} />,
    label: 'Passive Perception',
    units: null,
    type: 'number',
    step: 1
  },
  {
    id: 3,
    icon: <FontAwesomeIcon icon={faRunning} />,
    label: 'Movement Speed',
    units: 'ft',
    type: 'number',
    step: 5
  },
  {
    id: 4,
    icon: <FontAwesomeIcon icon={faWeight} />,
    label: 'Weight',
    units: 'lbs',
    type: 'number',
    step: 5
  }
];

const playerDetailIds = {
  Name: 0,
  ArmorClass: 1,
  PassivePerception: 2,
  MovementSpeed: 3,
  Weight: 4
};

export default {
  PlayerDetails: playerDetails,
  PlayerDetailIds: playerDetailIds
};
