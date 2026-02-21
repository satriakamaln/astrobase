const express = require("express");
const supabase = require("@supabase/supabase-js");
const cors = require("cors");
const app = express();
const port = 3211;

app.use(cors());
app.use(express.json());

const SUPABASE_URL = "https://fefbleofjujbvnortjag.supabase.co";
const SUPABASE_SERVICE_ROLE =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlZmJsZW9manVqYnZub3J0amFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTQ2NDg4NCwiZXhwIjoyMDg3MDQwODg0fQ.Jq11EbiRW_Wi9MAmcxgE_fT2_pp-236dJXT-VfuAcjw";

const db = supabase.createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.get("/", async (request, response) => {
    const getBlog = await db.from("blog").select();
    response.json({ getBlog });
});

app.post("/", async (request, response) => {
    const { title, description } = request.body;
    const createPost = await db.from("blog").insert({ title, description });
    console.log("app.post -> createPost", createPost);

    response.json({ createPost });
});
