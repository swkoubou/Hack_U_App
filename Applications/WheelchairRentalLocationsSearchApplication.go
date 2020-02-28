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
	return w.database.FindAllLocation()
}

func (w *WheelchairRentalLocationsSearchApplication) SearchTag(tagIds []uint64) ([]*Models.WheelchairRentalLocation, error) {
	return w.database.FindTags(tagIds)
}

func (w *WheelchairRentalLocationsSearchApplication) GetAllTags() ([]*Models.Tag, error) {
	return w.database.FindAllTags()
}
