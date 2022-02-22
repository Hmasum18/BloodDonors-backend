import LocationRepository from "../repository/location_repository.js"

const locationRepository = new LocationRepository();

export default class LocationController {

    checkingExistingLocation = async (locationDescription) => {

        const result = await locationRepository.getOneUsingDescription(locationDescription, false);
        if (result.success) {
            return {
                success: true,
                data: result.data, // false if already exists
            }
        }
        return result;
    }

    retriveLocationFromObject = (arr) => {
        return arr.map(x => {
            let y = {
                ...x,
                location: {
                    latitude: x.latitude,
                    longitude: x.longitude,
                    description: x.description,
                }
            };
            ['latitude', 'longitude', 'description'].forEach(e => delete y[e])
            return y;
        });
    }

}