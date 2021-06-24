import React from 'react'
import { withRouter } from 'react-router-dom'


import './menu-item.styles.scss'

const MenuItem = ({title,imageUrl,expand,history,match,linkUrl}) => (
    <div 
    onClick={()=>{history.push(`${match.url}${linkUrl}`)}}
    
    className={`menu-item `}>
    <div style={{
        backgroundImage:`url(${imageUrl})`

    }}
        className={`background-image ${expand?'menu-item-expanded':''} `}
    >
    </div>

        <div className="content">
            <h1 className="title">{title}</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
);

export default withRouter(MenuItem);