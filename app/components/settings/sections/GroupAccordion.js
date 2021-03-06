import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Icon, Label } from 'semantic-ui-react';

import { EntityListing } from './EntityListing';

export const GroupAccordion = props =>
    <React.Fragment>
        <Accordion.Title active={props.isActive} index={props.index} onClick={props.handleTitleClick}>
            <div className='left'>
                <Icon name='dropdown' />
                {props.title}
            </div>
            <Label size='mini' content={props.items.length} />
        </Accordion.Title>
        <Accordion.Content active={props.isActive}>
            <EntityListing
                entityType={props.title.substring(0, props.title.length - 1)}
                items={props.items}
                viewUsage={props.viewUsage}
                editNotifications={props.editNotifications}
                editItem={props.editItem} />
        </Accordion.Content>
    </React.Fragment>;

GroupAccordion.defaultProps = {
    isActive: true,
};

GroupAccordion.propTypes = {
    isActive: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        name: PropTypes.string,
    })).isRequired,
    handleTitleClick: PropTypes.func.isRequired,
    viewUsage: PropTypes.func,
    editNotifications: PropTypes.func,
    editItem: PropTypes.func,
};
