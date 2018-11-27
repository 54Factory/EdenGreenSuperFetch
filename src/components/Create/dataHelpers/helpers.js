
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

export const createNewLocation = (ownedById, location, photoURL) => {
  console.log(location);

  return {
    ...location,
    ownershipProfileId: ownedById,
    locationPhotoURL: "assets/pizza_pyramids_1250235.jpg",
    dateCreated: Date.now(),
    ownedBy: {
      [ownedById]: {
        displayName: `${location.firstName} ${location.lastName}`,
        photoURL: photoURL || 'assets/userPhoto.jpg'
      }
    }
  }
}