import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { credentials } from "./credentials.js"

initializeApp({
  credential: cert(credentials),
})

const db = getFirestore()

// const car = { make: "Mercedez", model: "Z3", year: 2020, color: "White" }
// const car2 = { make: "Macerati", model: "MZ20", year: 2022, color: "Green" }
// const car3 = { make: "Porsche", model: "911", year: 2022, color: "Black" }

//this adds a new file with the info we put but will always make a new file
// db.collection("cars")
//   .add(car)
//   .add(car2)
//   .add(car3)
//   .then((doc) => {
//     console.log("Doc added:", doc.id)
//   })
//   .catch(console.error)

//this doesnt add a new doc unless there isnt one previously named that
//this only changes whats in the document once it exists
// db.collection('cars').doc('lambo')
//     .set({make: 'Lamborghini', model: 'Diablo', year: 2020, color: 'Yellow'})

//this how to update a document without erasing any  other of the info
// db.collection("cars").doc("lambo").update({ color: "red" })

//this is how to get information from the database
//single document
db.collection("cars")
  .doc("lambo")
  .get()
  .then((doc) => {
    console.log(doc.id)
    console.log(doc.data())
  })
  .catch(console.error)

//Get a whole collection
db.collection("cars")
  .get()
  .then((collection) => {
    collection.docs.forEach((doc) => console.log(doc.id, doc.data()))
  })
  .catch(console.error)

//query docs from collection
db.collection("cars")
  .where("year", ">", 2015)
  .get()
  .then((collection) => {
    const cars = collection.docs.map((doc) => {
        let car = doc.data()
        car.id = doc.id
        return car
    })
    console.log(cars)
  })
  .catch(console.error)
