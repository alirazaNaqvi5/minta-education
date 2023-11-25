import aws from 'aws-sdk';

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
    acl: 'public-read',
  });

  const s3 = new aws.S3();
  const post = await s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME,
    Fields: {
      key: req.query.file,
    },
    Expires: 300, // seconds
    Conditions: [
      ['content-length-range', 0, 50 * 1024 * 1024], // up to 50 MB
    ],
  });

  const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.query.file}`;

  res.status(200).json({ ...post, publicUrl });
}