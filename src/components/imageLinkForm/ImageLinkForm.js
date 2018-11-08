import React from 'react';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return(
		<div>
			<p className='f3'>
				{'This magic brain will detect faces in your pictures'}
			</p>
			
			<div className='center w-80 w-60-l pa4 br3 shadow-5'>
				<input className='w-100 f4 pa2 center' type='text' onChange={onInputChange} />
				<button className='grow f4 link ph3 pv2 white bg-light-purple' onClick={onButtonSubmit}>Detect</button> 
			</div>
		</div>
	);
}	

export default ImageLinkForm;