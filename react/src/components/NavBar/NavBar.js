import React from 'react'

import './NavBar.css'

const navBarData = [
	{
		"type": "Stays",
		"icon": "fa-bed",
		"titleNav": "Stays",
		"active": true
	},
	{
		"type": "Flights",
		"icon": "fa-plane",
		"titleNav": "Flights",
		"active": false
	},
	{
		"type": "Car rentals",
		"icon": "fa-car",
		"titleNav": "Car rentals",
		"active": false
	},
	{
		"type": "Attractions",
		"icon": "fa-bed",
		"titleNav": "Attractions",
		"active": false
	},
	{
		"type": "Airport taxis",
		"icon": "fa-taxi",
		"titleNav": "Airport taxis",
		"active": false
	}
]

function NavBar() {
	

	return (
		<div>
			{navBarData.map((item, i) => (
				<div key={i} className={`navbar ${item['active'] ? 'active' : ''}`}>
					<i className={`fa ${item['icon']}`}></i>
					{item['titleNav']}
				</div>
			))}
		</div>
	)
}

export default NavBar