import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Segment } from 'semantic-ui-react';

import { EntityMenu } from '../sections/EntityMenu';
import { EntityListing } from '../sections/EntityListing';
import { sortByNumericProperty } from '../../../api/sort';

export class DevicesMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static propTypes = {
        entities: PropTypes.shape({
            groups: PropTypes.instanceOf(Map).isRequired,
            devices: PropTypes.instanceOf(Map).isRequired,
            channels: PropTypes.instanceOf(Map).isRequired,
        }).isRequired,
        activeDevice: PropTypes.string.isRequired,
        changeActiveDevice: PropTypes.func.isRequired,
    };

    getChannels = group => {
        const result = {
            groups: [],
            devices: [],
            channels: [],
        };
        group.members.forEach(member => {
            if (member.type === 'group') {
                result.groups.push(member);
            } else if (member.type === 'device') {
                result.devices.push(member);
            } else if (member.type === 'channel') {
                result.channels.push(member);
            }
        });
        return result;
    };

    render() {
        const { devices } = this.props.entities;
        let activeDevice = null;

        if (devices.size > 0) {
            activeDevice = devices.get(this.props.activeDevice);
            this.props.entities.channels.forEach(channel => {
                if (channel.deviceID === this.props.activeDevice) {
                    activeDevice.channels.set(channel.key, channel);
                }
            });
        }

        return (
            <Grid>
                <Grid.Column width={5} className="squarify">
                    <EntityMenu
                        entityType="device"
                        activeItem={this.props.activeDevice}
                        items={devices}
                        setActiveItem={this.props.changeActiveDevice} />
                </Grid.Column>

                <Grid.Column width={11} className="squarify">
                    {
                        activeDevice &&
                            <Segment.Group>
                                <Segment>{activeDevice.name || 'Unnamed Device'}</Segment>
                                <Segment>
                                    {
                                        activeDevice &&
                                            <EntityListing
                                                entityType="channel"
                                                items={[...activeDevice.channels.values()]} />
                                    }
                                </Segment>
                            </Segment.Group>
                    }
                </Grid.Column>
            </Grid>
        );
    }
}
