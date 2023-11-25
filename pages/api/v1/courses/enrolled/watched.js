import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import { 
    watched_videos
} from '@/models/index'
import { verify } from 'jsonwebtoken'

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    })
)

export default async (req, res) => {
    await cors(req, res)
    if(!("authorization" in req.headers)){
        return res.status(401).json({message: "No autorization token"});
    }
    
    try {

        const {userId} = verify(req.headers.authorization, process.env.JWT_SECRET)
        const {videoId,watchedAt} = req.body

        const alreadyWatched = await watched_videos.findOne({
            where: {
                userId,
                videoId
            }
        })

        if(alreadyWatched) {
            return res.status(200).json({message: "Video already watched"})
        }
       
        await watched_videos.create({
            userId,
            videoId,
            watchedAt
        })

        res.send({
            message: "Video watched"
        })

    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }

}