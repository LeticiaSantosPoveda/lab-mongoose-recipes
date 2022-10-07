const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
   .then(() => {
     return Recipe.create({
       title: "Paella de marisco",
       level: "UltraPro Chef",
       ingredients: ["arroz", "gambas", "pescado", "caldo"],
       cuisine: "mediterranea",
       dishType: "main_course",
       image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.recetasnestle.com.ar%2Fsites%2Fdefault%2Ffiles%2Fsrh_recipes%2F876038bcd1cf5abcaa28e86d9705eaf6.jpg&imgrefurl=https%3A%2F%2Fwww.recetasnestle.com.ar%2Frecetas%2Fpaella&tbnid=mj7hIJRdRM2qjM&vet=12ahUKEwjHsvusmM76AhUQWxoKHbMmAZcQMygIegUIARCbAg..i&docid=KDHOLj4z0PkJ1M&w=2000&h=1333&q=paella%20imagen&ved=2ahUKEwjHsvusmM76AhUQWxoKHbMmAZcQMygIegUIARCbAg",
       duration: 50,
       creator: "Leticia",
       created: 06/10/2022
     })
   })
  .then(() => {
    return Recipe.insertMany(data);
  })

  .then(resultado => {
      resultado.forEach((result)=> {
        console.log(result.title);
      })  
  })

  .then(() => {
    return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100});
  })
  
  .then(resultado2 => {
        console.log("Duration cambiada: ", resultado2); 
  })

  .then(() => {
    return Recipe.deleteOne({title: "Carrot Cake"});
  })
  
  .then(resultado3 => {
        console.log("Resultado deleteOne: ", resultado3); 
        return "ok";
  })

  .then(close => {
    if (close) {
      mongoose.connection.close(()=>{
        console.log("close!");
      })
    } 
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

 
 


  

