import {
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber,
  StatArrow,
  Box,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import React from "react";

export default function StatCard({ lable, value, type, percentage, color }) {
  return (
    <Box color={color}>
      <Stat>
        <StatLabel>{lable}</StatLabel>
        <StatNumber>{value}</StatNumber>
        {type ? (
          <StatHelpText>
            <StatArrow type={type} />
            {percentage}%
          </StatHelpText>
        ) : null}
      </Stat>
    </Box>
  );
}
