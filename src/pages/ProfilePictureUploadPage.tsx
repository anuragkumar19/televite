import { Avatar, Button, Typography } from '@material-ui/core'
import { CloudUpload } from '@material-ui/icons'
import axios from 'axios'
import React, { FC, useState } from 'react'
import Dropzone from 'react-dropzone'
import { useSelector } from 'react-redux'
import { State } from 'src/types'
import { CenteredCard } from '../components/CenteredCard'
import { useProtect } from '../hooks/useProtect'

export const ProfilePictureUploadPage: FC<any> = ({ history }) => {
    useProtect(history)

    const user = useSelector((state: State) => state.user)

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState<File>()
    const [src, setSrc] = useState(user?.profilePicture)

    const handleDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 1) {
            setFile(acceptedFiles[0])
            setSrc(URL.createObjectURL(acceptedFiles[0]))
            setError('')
        } else if (acceptedFiles.length > 1) {
            setError('Please drop only one file')
        }
    }

    const handleSubmit = async () => {
        if (!file) {
            return setError('No file selected')
        }

        if (!file.type.startsWith('image')) {
            return setError('Select a image')
        }

        if (file.size > 5000000) {
            return setError('Image cannot be larger than 5mb')
        }

        try {
            const formData = new FormData()

            formData.append('image', file)
            setLoading(true)
            const { data } = await axios.put(
                '/api/user/update/profilePicture',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${user?.accessToken}`,
                    },
                }
            )

            console.log(data)
            history.push('/profile')
        } catch (err) {
            alert(err.response.data.message)
            setLoading(false)
        }
    }

    return (
        <CenteredCard>
            <Dropzone multiple={false} onDrop={handleDrop} disabled={loading}>
                {({ getRootProps, getInputProps, isFocused }) => (
                    <>
                        <Avatar
                            src={src}
                            style={{
                                margin: 'auto',
                                width: '200px',
                                height: '200px',
                            }}
                        />
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>
                                Drag 'n' drop some image here, or click to
                                select image
                            </p>
                        </div>
                    </>
                )}
            </Dropzone>
            <Typography style={{ color: 'red' }}>{error}</Typography>
            <Button
                variant='contained'
                color='primary'
                onClick={handleSubmit}
                startIcon={<CloudUpload />}
            >
                Upload
            </Button>
        </CenteredCard>
    )
}
