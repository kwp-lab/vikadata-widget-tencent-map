import React from 'react';
import { Setting } from './setting';
import { Map } from './map';

export const WidgetDeveloperTemplate: React.FC = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flexGrow: 1, overflow: 'auto', padding: '0 8px'}}>
        <Map />
      </div>
      <Setting />
    </div>
  );
};
