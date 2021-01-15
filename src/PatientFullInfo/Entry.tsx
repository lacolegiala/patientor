import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Entry } from '../types';

const HospitalEntry: React.FC<{entry: Entry}> = () => {
  return (
    <Icon name='hospital'/>
  );
};

const OccupationalHealthcareEntry: React.FC<{entry: Entry}> = () => {
  return (
    <Icon name='doctor' />
  );
};

const HealthCheckEntry: React.FC<{entry: Entry}> = () => {
  return (
    <Icon name='heart' />
  );
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type) {
    case "Hospital":
      return (
        <div>
          <HospitalEntry entry={entry} />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <OccupationalHealthcareEntry entry ={entry} />
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <HealthCheckEntry entry={entry} />
        </div>
      );
  }
};

export default EntryDetails;