//import moment from 'moment';

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
  }
}

export const createDataTree = dataset => {
  let hashTable = Object.create(null);
  dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
  let dataTree = [];
  dataset.forEach(a => {
      if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
      else dataTree.push(hashTable[a.id])
  });
  return dataTree
};

// DATABASE - MODELLING SHAPE OF DATA
// CREATE NEW CUSTOMER

export const createNewLocation = (ownedById, oilCollectionServiceId, oilCollectionSetupServiceId, location, photoURL) => {
  location.oilCollectionSetUpDate = null;
  console.log(location);
  return {
    ...location,
    oilCollection: true,
    oilCollectionActive: false, 
    ownershipProfileId: ownedById,
    locationPhotoURL: "/assets/categoryImages/drinks.jpg",
    oilCollectionServiceId: oilCollectionServiceId,
    oilCollectionSetUpId: oilCollectionSetupServiceId,
    dateCreated: Date.now(),
    ownedBy: {
      [ownedById]: {
        displayName: `${location.firstName} ${location.lastName}`,
        photoURL: photoURL || '/assets/user.png'
      }
    }
  }
} 