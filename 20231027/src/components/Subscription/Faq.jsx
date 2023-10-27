import React, { useState } from 'react';
import { Text, Box, Accordion, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel } from '@chakra-ui/react';

function Faq() {
    const initialLimit = 150; // Set the initial character limit for each FAQ
    const [showFullMessage, setShowFullMessage] = useState({}); // Use an object to manage showFullMessage state for each FAQ

    // An array of FAQ items with questions and answers
    const faqs = [
        {
            question: 'What is Lorem Ipsum?',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can contact our customer support team by emailing support@example.com or calling 123-456-7890.',
        }, 
        {
            question: 'What is Lorem Ipsum?',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            question: 'How can I contact customer support?',
            answer: 'You can contact our customer support team by emailing support@example.com or calling 123-456-7890.',
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
