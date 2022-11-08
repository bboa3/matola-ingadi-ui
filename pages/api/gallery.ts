import { NextApiRequest, NextApiResponse } from 'next'
// const bucketName = process.env.AWS_S3_BUCKET_NAME

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { body } = req

    const token = req.headers.authorization

    if (!token) {
      return res.status(403).json({ authorized: false })
    }

    console.log(body)

    // let index = 0
    // for (const image of files) {
    //   if (image) {
    //     const fileName = `${event.id}-${index}`
    //     s3Upload({ bucketName, name: fileName, blob: image })
    //       .then(response => {
    //         console.log(response)
    //       })
    //       .catch(err => console.log(err))

    //     index += 1
    //   }
    // }
  } else {
    // Handle any other HTTP method
  }
}
