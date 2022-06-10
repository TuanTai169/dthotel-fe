import React from 'react';
import Navbar from '../../../Navbar/Navbar';
import {
	GoogleMap,
	useLoadScript,
	Marker,
} from '@react-google-maps/api';

function Location() {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey:
			'AIzaSyCLD9ay3AVKvimSwy9yxiSuX5zoIGLRzZM ',
	});

	if (!isLoaded) {
		return (
			<div>
				<Navbar />
				{/* <Map /> */}
			</div>
		);
	}
}

const Map = () => {
	return (
		<GoogleMap
			zoom={10}
			center={{ lat: 11.882711, lng: 108.45157 }}
		></GoogleMap>
	);
};

export default Location;
