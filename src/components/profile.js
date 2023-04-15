import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
} from '@mui/material';
import { useRef } from 'react';

export const Profile = ({ imageurl, image }) => {

    const imageRef = useRef()

    const showOpenFileDialog = () => {
        imageRef.current.click();
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleChange = async (event) => {
        const fileObject = event.target.files[0];
        var image = document.getElementById('image')
        image.src = URL.createObjectURL(fileObject)
        var base64 = await convertBase64(fileObject);
        if (base64.match(/^data:([A-Za-z-+/]+);base64,(.+)$/)) {
            var bs64 = base64
            imageurl(bs64);

        } else {
        }

    };

    return (
        <Card >
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box>
                        <img id='image' src={image} height={150} />
                    </Box>

                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <input
                    ref={imageRef}
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleChange}
                />
                <Button
                    id='imageinput'
                    color="primary"
                    onClick={showOpenFileDialog}
                    fullWidth
                    variant="text"
                >
                    Upload picture
                </Button>
            </CardActions>
        </Card>
    )
};
