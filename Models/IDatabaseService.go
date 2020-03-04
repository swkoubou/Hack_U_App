package Models

type IDatabaseService interface {
	FindAllLocation() (locations []*WheelchairRentalLocation, err error)
	FindOneLocation(locationId uint64) (location *WheelchairRentalLocation, err error)
	FindTags(tagIds []uint64) (locations []*WheelchairRentalLocation, err error)
	FindAllTags() (tags []*Tag, err error)
	FindTag(location *WheelchairRentalLocation) (tags []*Tag, err error)
}
