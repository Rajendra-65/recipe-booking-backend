import express from "express"
import "dotenv/config"
import { ENV } from "./config/env.js"
import { db } from "./config/db.js"
import cors from "cors"
import { favoriteTable } from "./db/schema.js"
const app = express()
const PORT = ENV.PORT || 8001
import { and,eq } from "drizzle-orm"
app.use(express.json())
app.use(cors())



app.get("/api/health",(req,res)=>{
    res.status(200).json({
        success:true
    })
})

app.post("/api/favorites", async (req,res)=> {
    try{
        const {userId, recipeId, title , image, cookTime, servings} = req.body;
        console.log(userId,recipeId,title,image,cookTime,servings)
        if(!userId || !recipeId || !title){
            return res.status(400).json({
                error: "Missing required Fields"
            })
        }

        const newFav = await db.insert(favoriteTable).values([
            {
                userId,
                recipeId,
                title,
                image,
                cookTime,
                servings,
            }
        ]).returning()

        res.status(201).json(newFav[0])
    }catch(e){
        console.log("error in adding favorite",e);
        res.status(500).json({
            error: "something went wrong"
        })
    }
})

app.delete("/api/favorites/:userId/:recipeId", async (req,res)=>{
    try{
       const {userId,recipeId} =  req.params

       await db.delete(favoriteTable).where(
        and(eq(favoriteTable.userId,userId), eq(favoriteTable.recipeId,recipeId))
       )
       res.status(200).json({
        message : "Successful Deletion"
       })
    }catch(e){
        console.log("Error removing a favorite",e)
        res.status(500).json({
            error: "something went wrong"
        })
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running in the Port ${PORT}`)
})