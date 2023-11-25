import Cors from 'cors'
import initMiddleware from '@/lib/init-middleware'
import jwt from 'jsonwebtoken'
import { courses as Course } from '@/models/index'

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

    // remove course
    const {
        id
    } = req.body

    try {
        await Course.destroy({
            where: {id: id}
        })

        res.send("Congratulations! Successfully removed the course.")
    }
    catch (error) {
        console.log(error)
    }
}
