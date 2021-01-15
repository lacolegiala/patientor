import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Entry } from '../types';

const HospitalEntry: React.FC<{entry: Entry}> = ({entry}) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <Icon name='hospital'/>
    </div>
  );
};

const OccupationalHealthcareEntry: React.FC<{entry: Entry}> = ({entry}) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <Icon name='doctor' />
    </div>
  );
};

const HealthCheckEntry: React.FC<{entry: Entry}> = ({entry}) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <Icon name='heart' />
    </div>
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