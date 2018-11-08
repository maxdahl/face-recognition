import React from 'react';


const Rank = ({user}) => {
	return (
		<div>
			<div className='white f3'>
				{`Yo ${user.name}, your current rank is...`}
			</div>
			<div className='white f2'>
				{user.entries}
			</div>
		</div>
	);
}

export default Rank;