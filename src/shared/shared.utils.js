import AWS from 'aws-sdk';

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folder) => {
  const { createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folder}/${userId}-${Date.now()}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: 'hanjul',
      Key: objectName,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();
  return Location;
};
