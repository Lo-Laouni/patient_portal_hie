import React from 'react';

import classNames from 'classnames';

import From, { Item as ItemForm, GroupItem, ColCountByScreen } from 'devextreme-react/form';
import SelectBox from 'devextreme-react/select-box';
// import Button from 'devextreme-react/button';
import TextBox from 'devextreme-react/text-box';
// import Validator, { PatternRule, EmailRule } from 'devextreme-react/validator';
// import NumberBox from 'devextreme-react/number-box';

import { FormPhoto } from '../../utils/form-photo/FormPhoto';
import { ContactStatus } from '../../utils/contact-status/ContactStatus';
import { FormTextbox } from '../../utils/form-textbox/FormTextbox';

import { Contact } from '../../../types/crm-contact';
import { CONTACT_STATUS_LIST } from '../../../shared/constants';
import { Patient } from '../../../types/patient';

const PHOTO_SIZE = 184;

const statusRender = (text: string) => (
  <div className='status-editor-field'>
    <ContactStatus text={text} showText={false} />
    <TextBox
      className={`status-contact status-${text.toLowerCase()}`}
      inputAttr={{ statusEditorInput: '' }}
      readOnly
      text={text}
      hoverStateEnabled={false}
    />
  </div>
);

const statusItemRender = (text: string) => <ContactStatus text={text} />;

export const ContactFromDetails = ({ data, bio, editing, updateField }: {
  data: Contact, bio: Patient, editing: boolean, updateField: (field: string | number) => (value: string | number) => void
}) => {
  const stylingMode = 'filled';
  return (
    <From
      className={classNames({ 'plain-styled-form': true, 'view-mode': !editing })}
      labelMode='floating'
    >
      <GroupItem colCount={2}>
        <ColCountByScreen xs={2} />
        <ItemForm>
          <FormPhoto link={data.image} size={PHOTO_SIZE} />
        </ItemForm>

        <GroupItem>
          <ItemForm cssClass='accent'>
            <FormTextbox
              label='Vital Status'
              value={data.firstName}
              isEditing={!editing}
              onValueChange={updateField('firstName')}
            />
          </ItemForm>

          <ItemForm cssClass='accent'>
            <FormTextbox
              label='First Name'
              value={bio.name![0]?.family!}
              isEditing={!editing}
              onValueChange={updateField('firstName')}
            />
          </ItemForm>

          <ItemForm cssClass='accent'>
            <FormTextbox
              label='Last Name'
              value={bio.name![0]?.given![0]}
              isEditing={!editing}
              onValueChange={updateField('lastName')}
            />
          </ItemForm>
        </GroupItem>
        <ItemForm cssClass='accent'>
          <FormTextbox
            label='Gender'
            value={bio.gender!}
            isEditing={!editing}
            onValueChange={updateField('position')}
          />
        </ItemForm>

        <ItemForm cssClass='accent'>
          <FormTextbox
            label='Date of Birth'
            value={bio.birthDate!}
            isEditing={!editing}
            onValueChange={updateField('manager')}
          />
        </ItemForm>
        <ItemForm cssClass='accent'>
          <FormTextbox
            label='Father Names'
            value={data.position}
            isEditing={!editing}
            onValueChange={updateField('position')}
          />
        </ItemForm>

        <ItemForm cssClass='accent'>
          <FormTextbox
            label='Mother Names'
            value={data.manager}
            isEditing={!editing}
            onValueChange={updateField('manager')}
          />
        </ItemForm>
        <ItemForm cssClass='accent'>
          <FormTextbox
            label='Marital Status'
            value={data.position}
            isEditing={!editing}
            onValueChange={updateField('position')}
          />
        </ItemForm>

        <ItemForm cssClass='accent'>
          <FormTextbox
            label='Blood Group'
            value={data.manager}
            isEditing={!editing}
            onValueChange={updateField('manager')}
          />
        </ItemForm>
      </GroupItem>

      <GroupItem colCount={2} caption='IDENTIFIERS'>
        <ColCountByScreen xs={2} />
        <ItemForm cssClass='accent'>
          <FormTextbox
            label='National ID'
            value={data.address}
            isEditing={!editing}
            onValueChange={updateField('address')}
          />
        </ItemForm>

        <ItemForm cssClass='accent'>
          <FormTextbox
            label='Health ID (UPI)'
            value={data.city}
            isEditing={!editing}
            onValueChange={updateField('city')}
          />
        </ItemForm>
        <ItemForm cssClass='accent'>
          <FormTextbox
            label='NIDA NIN'
            value={data.city}
            isEditing={!editing}
            onValueChange={updateField('city')}
          />
        </ItemForm>
        <ItemForm cssClass='accent'>
          <FormTextbox
            label='NIDA Application number'
            value={data.city}
            isEditing={!editing}
            onValueChange={updateField('city')}
          />
        </ItemForm>
      </GroupItem>
    </From>
  );
};
