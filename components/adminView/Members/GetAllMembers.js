import { useState } from 'react';
import React from 'react';
import fetch from 'isomorphic-unfetch';
import BootstrapTable from 'react-bootstrap-table-next';

async function FetchAllMembers(baseUrl) {
	// var buildUrl = `https://bgg-api.azurewebsites.net/api/GetAllMembers`;
	var buildUrl = `${baseUrl}/GetAllMembers`;
	const result = await fetch(buildUrl);
	const data = await result.json();
	return data;
}

const columns = [
	{
		dataField: 'Members',
		text: 'Members',
		sort: true,
		headerAlign: 'center'
	}
];

function GetAllMembers(props) {
	const [ allMembers, setAllMembers ] = useState([]);

	if (props.refresh) {
		FetchAllMembers(props.baseUrl).then((response) => {
			const initials = response
				.map((x) => ({
					Members: x.initials
				}))
				.sort();
			console.log('initials:');
			console.log(initials);
			setAllMembers(initials);
		});

		props.setRefresh();
	}

	return (
		<div>
			<BootstrapTable
				keyField="id"
				data={allMembers}
				columns={columns}
				bordered={false}
				rowStyle={{ textAlign: 'center' }}
				hover
			/>
		</div>
	);
}

export default GetAllMembers;
