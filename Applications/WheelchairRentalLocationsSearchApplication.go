package Applications

import (
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

func (w *WheelchairRentalLocationsSearchApplication) SearchTag(tagIds []uint64) ([]*Models.WheelchairRentalLocation, error) {
	return w.database.FindTags(tagIds)
}

func (w *WheelchairRentalLocationsSearchApplication) GetAllTags() ([]*Models.Tag, error) {
	return w.database.FindAllTags()
}
