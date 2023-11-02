import React, { useState } from 'react';
import { Text, Box, Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel } from '@chakra-ui/react';

function Faq() {
    const initialLimit = 150; // Set the initial character limit for each FAQ
    const [showFullMessage, setShowFullMessage] = useState({}); // Use an object to manage showFullMessage state for each FAQ

    // An array of FAQ items with questions and answers
    const faqs = [
        {
            question: 'How can I make a payment?',
            answer: 'You have the option to make payments by securely adding your card details through our payment gateway.',
        },
        {
            question: 'What is the process for returning a book?',
            answer: 'To return a book, you must initiate a new subscription. When prompted, provide the delivery date of your previous book to facilitate the return process.',
        },
        {
            question: 'How can I change my subscription date?',
            answer: 'You can adjust your subscription date by paying a nominal fee. This will enable you to select a new date for your package delivery.',
        },
        {
            question: 'What is the estimated delivery time for my books?',
            answer: 'Typically, you can expect to receive your books within approximately 5 days from the date of your book order.',
        },
    ];


    const handleClick = (index) => {
        setShowFullMessage((prevState) => ({ ...prevState, [index]: !prevState[index] }));
    };

    return (
        <Box padding={5}>
            <Text fontSize={'2xl'} fontWeight={'extrabold'}>
                FAQ
            </Text>
            <Accordion allowMultiple paddingTop={3}>
                {faqs.map((faq, index) => (
                    <AccordionItem key={index}>
                        <h2>
                            <AccordionButton onClick={() => handleClick(index)} bgColor={'#CCE9FB'}>
                                <Box as="b" flex="1" textAlign="left" fontSize={'lg'} >
                                    {
                                        showFullMessage[index]
                                        ? faq.question
                                        : `${faq.question.slice(0, initialLimit)}...`}
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}  fontSize={18} bg={'white'}>
                            <Text paddingLeft={5}>
                                {faq.answer}
                            </Text>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>
        </Box>
    );
}
export default Faq;
