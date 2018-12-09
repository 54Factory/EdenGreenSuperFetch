export const oilCollectionSetUpQuery = ({locationId}) => {
  if (locationId !== null) {
    return [
      {
        collection: 'locations',
        doc: locationId,
        storeAs: 'locationDetails' 
      }
    ]
  } else {
    return [
      {
        collection: 'locations',
        doc: locationId,
        storeAs: 'locationDetails'
      }
    ]
  }

}