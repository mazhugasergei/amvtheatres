import { app } from "./firebase.config"
// Firestore
import {
  getFirestore,
  // multiple
  collection, getDocs,
  // single
  doc, getDoc, updateDoc
} from "firebase/firestore"
// Storage
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"



// function to get movies data from Firestore Database
export const getMovies = async (id_param = null) => {
  const db = getFirestore()
  // get single doc
  if(id_param){
    let data
    const docRef = doc(db, "amv-theatres", id_param)
    await getDoc(docRef)
      .then(doc => {
        data = { ...doc.data(), id: doc.id }
      })
    return data
  }
  // get all docs
  else{
    let data = []
    const colRef = collection(db, "amv-theatres")
    await getDocs(colRef)
      .then(snap => {
        snap.docs.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id })
        })
      })
    return data
  }
}

// function to get images from Firebase Storage
export const getImages = async (dir) => {
  const storage = getStorage()
  const listRef = ref(storage, dir)
  const res = await listAll(listRef)
  const promises = res.items.map((itemRef) => getDownloadURL(itemRef))
  const data = await Promise.all(promises)
  return data
}

// function to get an image from Firebase Storage
export const getImage = async (dir) => {
  const storage = getStorage()
  const itemRef = ref(storage, dir)
  return await getDownloadURL(itemRef)
}

export const undateOccupiedSeats = async (id_param, theatre_param, date_param, time_param, seats_param) => {
  const db = getFirestore()
  const docRef = doc(db, "amv-theatres", id_param)
  let data
  await getDoc(docRef)
    .then(doc => {
      data = { ...doc.data() }
    })
  const seats = seats_param.split(",")
  let occupied_seats = ""
  if(data.hasOwnProperty("occupied_seats")) occupied_seats = data.occupied_seats
  seats.forEach(seat => {
    occupied_seats += theatre_param + "_" + date_param + "_" + time_param + "_" + seat + ", "
  })
  await updateDoc(docRef, {
    occupied_seats: occupied_seats
  })
}