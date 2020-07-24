import Dropdown from 'react-bootstrap/Dropdown';
import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const weights = [ 6, 5, 4, 3, 2, 1, 0 ];

function WeightDropdown(props) {
	const [ selection, setSelection ] = useState(props.defaultSelection);

	return (
		<Dropdown>
			<Dropdown.Toggle variant="success" id="dropdown-basic">
				{selection}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{weights.map((x) => (
					<Dropdown.Item
						key={x}
						eventKey={x}
						onSelect={(obj) => {
							if (props.availableDropdowns.includes(x)) {
								if (selection != 0) {
									// readd item
									console.log(`re-add ${selection} to the props.availableDropdowns`);
									props.availableDropdowns.push(selection);
									props.setAvailableDropdowns(props.availableDropdowns);
								}
								setSelection(x);
								// only remove from available options IF it is not 0, because 0 is always available for reset purposes
								if (x != 0) {
									props.availableDropdowns.splice(props.availableDropdowns.indexOf(x), 1);
									console.log(`props.availableDropdowns.includes(x): ${props.availableDropdowns}`);
								}
								props.setAvailableDropdowns(props.availableDropdowns);
								props.onSelectSelection(x);
							} else {
								alert(
									`The weight you are trying to assign is already in use. Reset selected game with weight '${x}' to '0' to have weight available again.`
								);
							}
						}}
					>
						<Dropdown.Divider />
						{x}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
}

WeightDropdown.propTypes = {
	setAvailableDropdowns: PropTypes.func,
	availableDropdowns: PropTypes.array,
	onSelectSelection: PropTypes.func
};

export default WeightDropdown;
