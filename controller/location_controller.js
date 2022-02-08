import LocationRepository from "../repository/location_repository.js"

const locationRepository = new LocationRepository();

export default class LocationController {

    checkingExistingLocation = async (locationDescription) => {

        const result = await locationRepository.getOneUsingDescription(locationDescription);
        if (result.success) {
            return {
                success: true,
                data: result.data, // false if already exists
            }
        }
        return result;
    }


}