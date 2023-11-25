const path = require("path");
const withPWA = require("next-pwa");
const nextTranslate = require("next-translate");



module.exports ={... nextTranslate(
    withPWA({
        pwa: {
            disable: process.env.NODE_ENV === "development",
            // dest: 'public',
            register: true,
            sw: "/sw.js",
        },
        sassOptions: {
            includePaths: [path.join(__dirname, "styles")],
        },
        env: {
            JWT_SECRET: process.env.JWT_SECRET,
            SENDGRID_KEY: process.env.SENDGRID_KEY,
            CLOUDINARY_URL:
                // "https://api.cloudinary.com/v1_1/dev-empty/image/upload",
                "https://api.cloudinary.com/v1_1/dlaq55hzu/image_upload/upload",
            CLOUDINARY_VIDEO_URL:
                "https://api.cloudinary.com/v1_1/dlaq55hzu/video_upload/upload",
            STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
            STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
        },
        // hosts
       

    })
    ),
    'images': {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
}

