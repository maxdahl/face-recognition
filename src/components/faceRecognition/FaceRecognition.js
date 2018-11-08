import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({faceRegionBoxes, imgSrc}) => {
	const faceBoxes = faceRegionBoxes.map(faceBox => {
		console.log(faceBox);
		return (
			<div key={faceBox.id} className='boundingBox' style=
				{{
							top: faceBox.topRow,
							right: faceBox.rightCol,
							bottom: faceBox.bottomRow,
							left: faceBox.leftCol,
				}}>
			</div>
		);
	});

	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputImage' alt='processed image' src={imgSrc} width='500px' height='auto'/>
				{ faceBoxes }
			</div>
		</div>
	);
}

export default FaceRecognition;