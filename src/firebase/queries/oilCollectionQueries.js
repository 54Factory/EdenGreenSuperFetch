export const oilCollectionSetUpQuery = ({locationId}) => {
    return [
      {
        collection: 'locations',
        doc: locationId,
        storeAs: 'locationDetails' 
      }
    ]
  } 

