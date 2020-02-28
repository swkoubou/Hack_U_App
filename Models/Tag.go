package Models

type Tag struct {
	TagId uint64
	Name  string
}

func NewTag() *Tag {
	return &Tag{}
}