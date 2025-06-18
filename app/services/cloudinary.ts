export const uploadToCloudinary = async (
  uri: string,
  preset = 'receitasApp',
  cloudName = 'dtjycztnd'
): Promise<string> => {
  const data = new FormData();
  data.append('file', {
    uri,
    name: 'upload.jpg',
    type: 'image/jpeg',
  } as any);
  data.append('upload_preset', preset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: data,
  });

  const result = await res.json();
  return result.secure_url;
};
