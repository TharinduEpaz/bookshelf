
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminDbSummary from "../components/Admin/AdminDbSummary";
//import Chart from "../components/Admin/Chart";
import AdminDBTable from "../components/Admin/AdminDBTable";
import React, { useState } from 'react';
import AdminBarChart from "../components/Admin/AdminBarChart";
import AdminLineChart from "../components/Admin/AdminLineChart";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'


import {
    Box, 
    Flex,
    Heading,
    Text
} from '@chakra-ui/react'

/*
const [userData, setUserData] = useState(
  {
    labels: userData.map((data)=>data.year),
    datasets: [{
      label: "Users",
      data: userData.map((data)=>data.user),
    }]
  }
)
*/

export default function AdminDashboard() {


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
      colors: "#3ac1cf",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      strokeDashArray: 5,
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
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

  //linechart data
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
      colors: ["#de789a", "#3acfb8"],
    },
    colors: ["#254b98", "#257198"],
  };








  const adminDbSummaryDetails = {
    totalRevenue: {
      title: "TOTAL REVENUE",
      text:"RS. 12 100 230",
      image: <svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.5003 3.91667C12.6903 3.91667 3.91699 12.69 3.91699 23.5C3.91699 34.31 12.6903 43.0833 23.5003 43.0833C34.3103 43.0833 43.0837 34.31 43.0837 23.5C43.0837 12.69 34.3103 3.91667 23.5003 3.91667ZM26.2616 35.4263V39.1667H21.0328V35.3871C17.6841 34.6821 14.8445 32.5279 14.6291 28.7288H18.4674C18.6632 30.785 20.0732 32.3908 23.657 32.3908C27.4953 32.3908 28.357 30.4717 28.357 29.2771C28.357 27.6517 27.4953 26.1242 23.1282 25.0863C18.2716 23.9113 14.9424 21.9138 14.9424 17.8992C14.9424 14.5308 17.6645 12.3375 21.0328 11.6129V7.83334H26.2616V11.6521C29.9041 12.5333 31.7253 15.2946 31.8428 18.2908H28.0045C27.9066 16.1171 26.7512 14.6288 23.657 14.6288C20.7195 14.6288 18.957 15.9604 18.957 17.8404C18.957 19.4854 20.2299 20.5625 24.1857 21.5808C28.1416 22.5992 32.3716 24.3029 32.3716 29.2379C32.352 32.8217 29.6691 34.78 26.2616 35.4263Z" fill="#3182CE"/>
      </svg>,
    },

    totalOrders: {
      title: "TOTAL ORDERS",
      text:"720",
      image: <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M39.4163 14.3333C39.4338 14.2085 39.4338 14.0819 39.4163 13.9571V13.8138C39.3855 13.7138 39.3435 13.6176 39.2909 13.5271C39.2677 13.4755 39.2375 13.4273 39.2013 13.3838L39.0222 13.1508L38.8788 13.0433L38.6638 12.8821L22.5388 3.92375C22.2665 3.7665 21.9575 3.68372 21.643 3.68372C21.3285 3.68372 21.0195 3.7665 20.7472 3.92375L4.62217 12.8821L4.46092 13.0075L4.26384 13.1508C4.21179 13.2094 4.16945 13.276 4.13842 13.3479C4.0811 13.3993 4.03267 13.4599 3.99509 13.5271C3.94857 13.6057 3.91244 13.69 3.88759 13.7779C3.87757 13.8372 3.87757 13.8978 3.88759 13.9571C3.76441 14.0633 3.66125 14.1907 3.58301 14.3333V28.6667C3.58533 28.9859 3.67293 29.2988 3.83673 29.5728C4.00053 29.8469 4.23458 30.0722 4.51467 30.2254L20.6397 39.1838C20.7137 39.2269 20.7917 39.2629 20.8726 39.2913H21.0518C21.3461 39.3627 21.6533 39.3627 21.9476 39.2913H22.1268L22.3776 39.1838L38.5026 30.2254C38.7793 30.0699 39.0098 29.8435 39.1703 29.5697C39.3309 29.2958 39.4158 28.9841 39.4163 28.6667V14.3333ZM21.4997 21.2671L9.06551 14.3333L14.0105 11.61L26.2476 18.5975L21.4997 21.2671ZM21.4997 7.43542L33.9338 14.3333L29.9205 16.5729L17.6834 9.5675L21.4997 7.43542ZM7.16634 17.3792L19.708 24.4025V34.5792L7.16634 27.6096V17.3792ZM23.2913 34.5792V24.4025L28.6663 21.3925V26.875L32.2497 25.0833V19.3858L35.833 17.3971V27.6096L23.2913 34.5792Z" fill="#3182CE"/>
      </svg>,
    },

    subscriptions: {
      title: "SUBSCRIPTIONS",
      text:"134",
      image: <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.9997 3.33333C10.7997 3.33333 3.33301 10.8 3.33301 20C3.33301 29.2 10.7997 36.6667 19.9997 36.6667C29.1997 36.6667 36.6663 29.2 36.6663 20C36.6663 10.8 29.1997 3.33333 19.9997 3.33333ZM19.9997 33.3333C12.6497 33.3333 6.66634 27.35 6.66634 20C6.66634 12.65 12.6497 6.66666 19.9997 6.66666C27.3497 6.66666 33.333 12.65 33.333 20C33.333 27.35 27.3497 33.3333 19.9997 33.3333ZM26.9497 24.6L25.1163 22.7667C26.2997 20.55 25.9997 17.75 24.133 15.8833C23.592 15.3378 22.948 14.9052 22.2385 14.6105C21.529 14.3158 20.768 14.165 19.9997 14.1667C19.9497 14.1667 19.8997 14.1833 19.8497 14.1833L21.6663 16L19.8997 17.7667L15.183 13.05L19.8997 8.33333L21.6663 10.1L20.0663 11.7C22.183 11.7167 24.283 12.5 25.8997 14.1C28.733 16.95 29.083 21.3667 26.9497 24.6ZM24.8163 26.95L20.0997 31.6667L18.333 29.9L19.9163 28.3167C17.7383 28.2997 15.6546 27.4255 14.1163 25.8833C12.7597 24.5253 11.9129 22.741 11.7186 20.8314C11.5243 18.9217 11.9944 17.0034 13.0497 15.4L14.883 17.2333C13.6997 19.45 13.9997 22.25 15.8663 24.1167C17.033 25.2833 18.583 25.85 20.133 25.8L18.333 24L20.0997 22.2333L24.8163 26.95Z" fill="#3182CE"/>
      </svg>,
    },
    
  };

  return (


    <Box
      m={"auto"}
      mt={10}
      w="80%"
      h="100%"
      minH={800}
      borderRadius="6px"
      bg='rgba(255, 255, 255, 0.90)'
      boxShadow="sm"
      bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
      // filter="blur(8px)"
      backdropFilter="blur(14.5px)"
      p={4}

    >

    <AdminSidebar />

    <div>
      <Box
        borderColor={'rgba(0, 0, 0, 0.20)'}
        borderWidth={'0.5px'}
        borderRadius={'10px'}
        h="100%"
        w="76%"
        ml={270}
        mt={1}
        p={5}
      >

    <Flex
        gap={5}
        alignItems={"center"}
        justifyContent={"center"}
        w={"100%"} 
        flexWrap={"wrap"}
      >  

    {Object.keys(adminDbSummaryDetails).map((item) => (
          <AdminDbSummary
            key={item}
            title={adminDbSummaryDetails[item].title}
            image={adminDbSummaryDetails[item].image}
            text={adminDbSummaryDetails[item].text}
          />
        ))}

   </Flex>

   {/*<Chart chartData={userData}/>*/}
      <Box
        borderColor={'rgba(0, 0, 0, 0.20)'}
        borderWidth={'0.5px'}
        borderRadius={'10px'}
        h="50vh"
        w="100%"
        mt={10}
        mr={5}
      >

        <Flex gap={20}>
          <Box h={300} w={"50%"} mt={10}>
            <Text fontWeight={"semibold"} pl={20}>Sales</Text>
            <AdminBarChart chartData={barChartData} chartOptions={barChartOptions} />
          </Box>
          <Box h={300} w={"50%"} mt={10}>
            <Text fontWeight={"semibold"} pl={20}>Revenue</Text>
            <AdminLineChart
              chartData={lineChartData}
              chartOptions={lineChartOptions}
            />
          </Box>
        </Flex> 


      </Box>

      <Box
         borderColor={'rgba(0, 0, 0, 0.20)'}
         borderWidth={'0.5px'}
         borderRadius={'10px'}
         h="50vh"
         w="100%"
         mt={10}
         mr={5}
         p={10}
      >
      <Heading
        fontSize={'20px'} 
        color={'#000'} 
        fontFamily={'Montserrat'} 
        fontStyle={'normal'} 
        fontWeight={'800'} 
        lineHeight={'normal'}
        //textAlign={'center'}
        mt={'10px'}
        mb={'20px'}
      >
        Recent Summary Percentages
      </Heading>


    <Flex
    
    >
      <CircularProgress 
        value={40} color='green.400' size='120px' thickness='15px'>
      <CircularProgressLabel>45%</CircularProgressLabel>
      </CircularProgress>
      <Text p={5}>Donations</Text>

      <CircularProgress 
        value={40} color='green.400' size='120px' thickness='15px'>
      <CircularProgressLabel>68%</CircularProgressLabel>
      </CircularProgress>
      <Text p={5}>Subscriptions</Text>

      <CircularProgress 
        value={40} color='green.400' size='120px' thickness='15px'>
      <CircularProgressLabel>72%</CircularProgressLabel>
      </CircularProgress>
      <Text p={5}>Sharings</Text>

      </Flex>
      {/* <AdminDBTable/> */}


      </Box>

   </Box>
   </div>

    </Box>
    
    


  )
}
