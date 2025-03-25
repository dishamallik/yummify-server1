require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(
  cors({
    origin: ["http://localhost:5173",
       "yummify-psi.vercel.app" , "yummify-disha-malliks-projects.vercel.app" , "yummify-dishamallik-disha-malliks-projects.vercel.app"
      ],
    credentials: true,
  })
)








// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1qpflqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    const recipeCollection = client.db("yummifyUser").collection("recipes");
    const blogCollection = client.db("yummifyUser").collection("blogs");

    // Read all recipes
    app.get('/recipes', async (req, res) => {
      const recipes = await recipeCollection.find().toArray();
      res.send(recipes);
    });

    // Read a single recipe by ID
    app.get('/recipes/:id', async (req, res) => {
      const id = req.params.id;
      const recipe = await recipeCollection.findOne({ _id: new ObjectId(id) });
      res.send(recipe);
    });


    // Read all blogs
    app.get('/blogs', async (req, res) => {
      const blogs = await blogCollection.find().toArray();
      res.send(blogs);
    });

    // Read a single blog by ID
    app.get('/blogs/:id', async (req, res) => {
      const id = req.params.id;
      const blog = await blogCollection.findOne({ _id: new ObjectId(id) });
      res.send(blog);
    });








    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}
run().catch(console.dir);

// API Routes
app.get('/', (req, res) => {
  res.send('Running...');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
