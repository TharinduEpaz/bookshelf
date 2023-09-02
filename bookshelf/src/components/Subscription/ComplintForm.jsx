import React, { useState, useContext, useEffect } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import axios from 'axios';
import { userContext } from "../../context/userContext";

function ComplaintForm() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showAlert, setShowAlert] = useState(false);
    const { user } = useContext(userContext);

    const [complaint, setComplaint] = useState('');

    useEffect(() => {
        if (user) {
            setEmail(user.user.email);
            setName(`${user.user.name}`);
        }
    }, [user]);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const requestUrl = "http://localhost:3000/api/v1/subscriptions/subscriptionComplaint";

    const addComplaint = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(requestUrl, {
                email: email,
                name: name,
                complaint: complaint,
            });

            console.log(response.data);

            setEmail('');
            setName('');
            setComplaint('');
            setShowAlert(true);

            setTimeout(() => {
                setShowAlert(false);
                onClose();
            }, 4000);

            console.log(response);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div>
            <Button onClick={onOpen} color={'#3182CE'} variant={'outline'} border={'1px'} borderRadius={10} marginLeft={'150'}>
                Form
            </Button>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a Complaint</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={addComplaint}>
                        <ModalBody>
                            {showAlert && (
                                <Alert status='success'>
                                    <AlertIcon />
                                    Form submitted successfully!
                                </Alert>
                            )}

                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input type='email' value={email} readOnly />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input value={name} readOnly />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Complaint</FormLabel>
                                <Textarea name='complaint' onChange={(e) => setComplaint(e.target.value)} value={complaint} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button variant={'outline'} onClick={onClose} mr={200}>
                                Close
                            </Button>

                            <Button colorScheme='blue' mr={3} type='submit'>
                                Submit
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ComplaintForm;
