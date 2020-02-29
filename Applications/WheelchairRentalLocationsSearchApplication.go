package Applications

import (
	"errors"
	"github.com/swkoubou/Hack_U_App/Models"
)

type WheelchairRentalLocationsSearchApplication struct {
	database Models.IDatabaseService
}

func NewWheelchairRentalLocationsSearchApplication(db Models.IDatabaseService) *WheelchairRentalLocationsSearchApplication {
	return &WheelchairRentalLocationsSearchApplication{database: db}
}

func (w *WheelchairRentalLocationsSearchApplication) GetAllLocation() ([]*Models.WheelchairRentalLocation, error) {
	locations, err := w.database.FindAllLocation()
	if err != nil {
		return nil, err
	}
	for index, location := range locations {
		tags, err := w.database.FindTag(location)
		if err != nil {
			return nil, err
		}
		locations[index].Tag = tags
	}
	return locations, err
}

func (w *WheelchairRentalLocationsSearchApplication) GetLocationDetail(locationId uint64) (*Models.WheelchairRentalLocation, error) {
	location, err := w.database.FindOneLocation(locationId)
	if err != nil {
		return nil, err
	}
	if location == nil {
		return nil, errors.New("場所の情報がありませんでした。")
	}
	tags, err := w.database.FindTag(location)
	if err != nil {
		return nil, err
	}
	location.Tag = tags
	return location, err
}

func (w *WheelchairRentalLocationsSearchApplication) SearchTag(tagIds []uint64) ([]*Models.WheelchairRentalLocation, error) {
	return w.database.FindTags(tagIds)
}

func (w *WheelchairRentalLocationsSearchApplication) GetAllTags() ([]*Models.Tag, error) {
	return w.database.FindAllTags()
}
