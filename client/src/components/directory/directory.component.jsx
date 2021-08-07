import React from 'react'

import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import './directory.styles.scss';
import { selectMenuItems } from '../../redux/directory/directory.selectors'

import MenuItem from '../menu-item/menu-item.component';

const Directory = ({menuItems}) => {

    return (
        <div className="directory-menu">
            {menuItems.map(item=><MenuItem key={item.id} title={item.title} imageUrl={item.imageUrl} expand={item.expand} linkUrl={item.linkUrl} />)}
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
  menuItems:selectMenuItems
})

export default connect(mapStateToProps)(Directory)