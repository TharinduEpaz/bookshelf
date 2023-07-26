import {
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber,
  StatArrow,
  Box,
} from "@chakra-ui/react";
import React from "react";

export default function StatCard({ lable, value, type, percentage }) {
  return (
    <Box>
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
