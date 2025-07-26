import React, { useEffect, useState, useCallback } from 'react';

import { Item, Toolbar } from 'devextreme-react/toolbar';
import Button from 'devextreme-react/button';
import DropDownButton from 'devextreme-react/drop-down-button';
import { getAllPatients, getPatientById } from '../../api/apiClient';
import {
  ContactCards,
  ContactForm,
} from '../../components';

import { Contact } from '../../types/crm-contact';
import { Patient } from '../../types/patient';

import {
  getContact,
  getContactNotes,
  getContactMessages,
  getActiveContactOpportunities,
  getClosedContactOpportunities,
} from 'dx-template-gallery-data';

import './crm-contact-details.scss';
import ScrollView from 'devextreme-react/scroll-view';

const CONTACT_ID = 12;

export const CRMContactDetails = () => {
  const [data, setData] = useState<Contact>();
  const [biodata, setBioData] = useState<Patient>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = useCallback(() => {
    setIsLoading(true);
    Promise.all([
      getPatientById('7fd44f6a-3028-459a-8c47-94622dcb5623')
        .then((data_) => {
          setBioData(data_);
        }),
      getContact(CONTACT_ID)
        .then((data) => {
          setData(data);
        }),
    ]).then(() => { setIsLoading(false); }).catch((error) => console.log(error));
  }, []);

  const refresh = useCallback(() => {
    setIsLoading(true);
    loadData();
  }, []);

  return (
    <ScrollView className='view-wrapper-scroll'>
      <div className='view-wrapper view-wrapper-contact-details'>
        <Toolbar className='toolbar-details theme-dependent'>
          <Item location='before'>
            <Button icon='user' stylingMode='text' />
          </Item>
          <Item location='before' text='Patient BioData & Clinical Data' />
          <Item location='after' locateInMenu='auto'>
            <Button
              text='View'
              icon='eyeopen'
              type='default'
              stylingMode='contained'
            />
          </Item>
          <Item location='after'>
            <DropDownButton
              text='Actions'
              stylingMode='text'
              dropDownOptions={{ width: 'auto' }}
              items={['Assign to Me', 'Archive']}
            />
          </Item>
          <Item location='after' locateInMenu='auto'>
            <div className='separator' />
          </Item>
          <Item
            location='after'
            locateInMenu='auto'
            widget='dxButton'
            showText='inMenu'
          >
            <Button
              text='Copy'
              icon='copy'
              stylingMode='text'
            />
          </Item>
          <Item
            location='after'
            locateInMenu='auto'
            widget='dxButton'
            showText='inMenu'
          >
            <Button
              text='Refresh'
              icon='refresh'
              stylingMode='text'
              onClick={refresh}
            />
          </Item>
        </Toolbar>

        <div className='panels'>
          <div className='left'>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <ContactForm
                data={data}
                biodata={biodata} // biodata is safely passed after loading
                isLoading={isLoading}
              />
            )}
          </div>
          <div className='right'>
            <ContactCards
              isLoading={isLoading}
              tasks={data?.tasks}
              activities={data?.activities} />
          </div>
        </div>
      </div>
    </ScrollView>
  );
};
