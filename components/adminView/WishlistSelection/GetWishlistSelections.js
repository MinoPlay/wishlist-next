import BootstrapTable from 'react-bootstrap-table-next';
import { useState } from 'react';
import React from 'react';
import fetch from 'isomorphic-unfetch';

async function FetchWishlist(baseUrl) {
	var buildUrl = `${baseUrl}/GetWishlistSelections`;
	const result = await fetch(buildUrl);
	const data = await result.json();
	return data;
}

function GroupDataByGameIdAndWeight(data) {
	let resultArray = [];

	data.forEach((dataEntry) => {
		var allGamesBasedOnGameId = data.filter((df) => df.Id === dataEntry.Id);
		var totalWeight = allGamesBasedOnGameId.map((x) => x.Weight);
		var totalWeightSum = totalWeight.reduce(
			(accumulator, currentValue) => parseInt(accumulator) + parseInt(currentValue),
			0
		);
		if (!resultArray.some((s) => s.Id === dataEntry.Id)) {
			resultArray.push({ Id: dataEntry.Id, GameTitle: dataEntry.GameTitle, Weight: totalWeightSum });
		}
	});

	return resultArray;
}

const columns = [
	{
		dataField: 'User',
		text: 'User',
		sort: true
	},
	{
		dataField: 'Id',
		text: 'Game Id',
		sort: true
	},
	{
		dataField: 'GameTitle',
		text: 'Game Title',
		sort: true
	},
	{
		dataField: 'Weight',
		text: 'Weight',
		sort: true
	}
];

function GetWishlistSelections(props) {
	const [ data, setData ] = useState([]);
	const [ groupedGamesWithWeight, setGroupedGamesWithWeight ] = useState([]);

	if (props.refresh) {
		FetchWishlist(props.baseUrl).then((response) => {
			const wishlist = response.map((x) => x);
			const tempData = wishlist.map((wishlistEntry) => ({
				User: wishlistEntry.userId,
				Id: wishlistEntry.gameSelection,
				GameTitle: wishlistEntry.gameTitle,
				Weight: wishlistEntry.gameWeight
			}));

			setData(tempData);
			// make magic by presenting in reasonable way
			const tempGrouppedData = GroupDataByGameIdAndWeight(tempData);
			setGroupedGamesWithWeight(tempGrouppedData);
		});

		props.setRefresh();
	}

	const groupedGamesWithWeightColumns = [
		{
			dataField: 'Id',
			text: 'Game Id',
			sort: true,
			headerAlign: 'center'
		},
		{
			dataField: 'GameTitle',
			text: 'GameTitle',
			sort: true,
			headerAlign: 'center'
		},
		{
			dataField: 'Weight',
			text: 'Weight',
			sort: true,
			headerAlign: 'center'
		}
	];

	return (
		<div>
			<h1 style={{ textAlign: 'center' }}>Wishlist overview</h1>
			<BootstrapTable
				keyField="id"
				data={groupedGamesWithWeight}
				columns={groupedGamesWithWeightColumns}
				bordered={false}
				rowStyle={{ textAlign: 'center' }}
			/>
			<h1 style={{ textAlign: 'center' }}>Detailed overview</h1>
			<BootstrapTable keyField="id" data={data} columns={columns} />
		</div>
	);
}

export default GetWishlistSelections;
