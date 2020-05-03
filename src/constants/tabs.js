import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStickyNote, faUsers, faWrench} from '@fortawesome/free-solid-svg-icons';

const tabs = [
  {
    id: 0,
    icon: <FontAwesomeIcon icon={faUsers} />,
    label: 'Players'
  },
  {
    id: 1,
    icon: <FontAwesomeIcon icon={faWrench} />,
    label: 'Utilities'
  },
  {
    id: 2,
    icon: <FontAwesomeIcon icon={faStickyNote} />,
    label: 'Notes'
  }
];

const tabIds = {
  Players: 0,
  Utilities: 1,
  Notes: 2
};

export default {
  Tabs: tabs,
  TabIds: tabIds
};
