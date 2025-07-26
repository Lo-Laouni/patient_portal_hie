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
import { Bundle } from '../../types/bundle';

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
const PATIENT_ID = '1'

export const CRMContactDetails = () => {
  const [data, setData] = useState<Contact>();
  const [bundle, setBundle] = useState<Bundle>();
  const [biodata, setBioData] = useState<Patient>();
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [patientData, contactData] = await Promise.all([
        getPatientById(PATIENT_ID),
        getContact(CONTACT_ID)
      ]);

      setBundle(patientData);
      setData(contactData);

      // Extract patient resource from bundle if needed
      if (patientData) {
        const patientResource = patientData.entry?.find(e => e.resource?.resourceType === 'Patient')?.resource as Patient | undefined;
        setBioData(patientResource);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const refresh = useCallback(() => {
    setIsLoading(true);
    loadData();
  }, []);

  // console.log('Current bundle state:', bundle);
  // console.log('biooooooo', biodata);
  
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
