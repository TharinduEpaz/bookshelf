import React, { useState } from 'react';
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

function ComplaintForm() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [showAlert, setShowAlert] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        complaint: '',
    });

    const handleSubmit = () => {
        if (formData.email && formData.firstName && formData.lastName && formData.complaint) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
                onClose();
                setFormData({
                    email: '',
                    firstName: '',
                    lastName: '',
                    complaint: '',
                });
            }, 3000);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isError = formData.email === '' || formData.firstName === '' || formData.lastName === '' || formData.complaint === '';

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
                    <ModalBody>
                        {showAlert && (
                            <Alert status='success'>
                                <AlertIcon />
                                Form submitted successfully!
                            </Alert>
                        )}

                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type='email' name='email' value={formData.email} onChange={handleInputChange} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>First name</FormLabel>
                            <Input name='firstName' value={formData.firstName} onChange={handleInputChange} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Last name</FormLabel>
                            <Input name='lastName' value={formData.lastName} onChange={handleInputChange} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Complaint</FormLabel>
                            <Textarea name='complaint' value={formData.complaint} onChange={handleInputChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant={'outline'} onClick={onClose} mr={200}>
                            Close
                        </Button>

                        <Button colorScheme='blue' mr={3} onClick={handleSubmit} disabled={isError}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default ComplaintForm;
