import React from 'react';
import { Icon } from 'semantic-ui-react';
import { State } from '../state';
import { Entry } from '../types';

interface EntryProps {
  entry: Entry;
  state: State;
}

const HospitalEntry: React.FC<EntryProps> = ({entry, state}) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <Icon name='hospital'/>
      <p>
        {entry.description}
      </p>
      {entry.diagnosisCodes ? entry.diagnosisCodes.map(code =>
        <li key={code}>{code} - {state.diagnoses[code]?.name}</li>
      ) : null}
    </div>
  );
};

const OccupationalHealthcareEntry: React.FC<EntryProps> = ({entry, state}) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <Icon name='doctor' />
      <p>
        {entry.description}
      </p>
      {entry.diagnosisCodes ? entry.diagnosisCodes.map(code =>
        <li key={code}>{code} - {state.diagnoses[code]?.name}</li>
      ) : null}
    </div>
  );
};

const HealthCheckEntry: React.FC<EntryProps> = ({entry, state}) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <Icon name='heart' />
      <p>
        {entry.description}
      </p>
      {entry.diagnosisCodes ? entry.diagnosisCodes.map(code =>
        <li key={code}>{code} - {state.diagnoses[code]?.name}</li>
      ) : null}
    </div>
  );
};

const EntryDetails: React.FC<EntryProps> = ({entry, state}) => {
  switch(entry.type) {
    case "Hospital":
      return (
        <div>
          <HospitalEntry entry={entry} state={state} />
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div>
          <OccupationalHealthcareEntry entry ={entry} state={state} />
        </div>
      );
    case "HealthCheck":
      return (
        <div>
          <HealthCheckEntry entry={entry} state={state} />
        </div>
      );
  }
};

export default EntryDetails;