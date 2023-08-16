import {
  Box,
  Card,
  CardBody,
  Flex,
  Icon,
  Spacer,
  StatGroup,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";
import StatCard from "../../components/Moderator/StatCard";
import BarChart from "../../components/Moderator/BarChart";
import LineChart from "../../components/Moderator/LineChart";
import { BiBookOpen } from "react-icons/bi";

export default function Dashboard() {
  const barChartData = [
    {
      name: "Sales",
      data: [15, 25, 28, 10, 25, 20],
    },
  ];

  const barChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    xaxis: {
      categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      labels: {
        style: {
          colors: "#A0AEC0",
          fontSize: "12px",
        },
      },
      show: true,
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      color: "#A0AEC0",
      labels: {
        show: true,
        style: {
          colors: "#A0AEC0",
          fontSize: "14px",
        },
      },
    },
    fill: {
      colors: "#ED8936",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 5,
    },
    plotOptions: {
      bar: {
        borderRadius: 15,
        columnWidth: "15px",
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
            },
          },
        },
      },
    ],
  };

  //barchart data
  const lineChartData = [
    {
      name: "Subscriptions",
      data: [1000, 40000, 15000, 22000, 25500, 25420, 41000, 23000, 35000],
    },
    {
      name: "Sales",
      data: [30000, 40900, 40000, 14000, 29620, 29000, 34000, 23000, 40000],
    },
  ];

  const lineChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "light",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#fff", "#3182CE"],
    },
    colors: ["#fff", "#3182CE"],
  };
  return (
    <>
      <Box p={10}>
        <Flex gap={20}>
          <Card
            mt={5}
            p={5}
            pl={10}
            pr={10}
            boxShadow="sm"
            borderRadius="md"
            bgColor={"#EDF2F7"}
            w={"fit-content"}
          >
            <CardBody>
              <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
              <StatCard lable="Total Revenue" value="500" />
            </CardBody>
          </Card>
          <Card
            mt={5}
            p={5}
            pl={10}
            pr={10}
            boxShadow="sm"
            borderRadius="md"
            bgColor={"#EDF2F7"}
            w={"fit-content"}
          >
            <CardBody>
              <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
              <StatCard lable="Total Orders" value="500" />
            </CardBody>
          </Card>
          <Card
            mt={5}
            p={5}
            pl={10}
            pr={10}
            boxShadow="sm"
            borderRadius="md"
            bgColor={"#EDF2F7"}
            w={"fit-content"}
          >
            <CardBody>
              <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
              <StatCard lable="Subscriptions" value="500" />
            </CardBody>
          </Card>
        </Flex>
        <Spacer />

        <Flex gap={20}>
          <Box h={300} w={"50%"} mt={10}>
            <Text fontWeight={"semibold"}>Sales</Text>
            <BarChart chartData={barChartData} chartOptions={barChartOptions} />
          </Box>
          <Box h={300} w={"50%"} mt={10}>
            <Text fontWeight={"semibold"}>Revenue</Text>
            <LineChart
              chartData={lineChartData}
              chartOptions={lineChartOptions}
            />
          </Box>
        </Flex>
        <Box mt={20}>
          <Text fontWeight={"semibold"} mt={10}>
            Best Selling Books
          </Text>
          <TableContainer>
            <Table variant="simple" colorScheme="blue">
              <Thead>
                <Tr fontWeight={"bold"}>
                  <Td>Book ID</Td>
                  <Td>Book Names</Td>
                  <Td>Total Sales</Td>
                  <Td>Total Revenue</Td>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>b120125</Td>
                  <Td>The Science of Everything</Td>
                  <Td>100</Td>
                  <Td>5000</Td>
                </Tr>
                <Tr>
                  <Td>b120128</Td>
                  <Td>Mystery at Midnight Manor</Td>
                  <Td>98</Td>
                  <Td>5800</Td>
                </Tr>
                <Tr>
                  <Td>b124525</Td>
                  <Td>Cooking Delights: Recipes from Around the World</Td>
                  <Td>92</Td>
                  <Td>4900</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
